from flask import Flask, render_template, request, jsonify, session, Response
from query import HRAssistant
import os
import secrets
from datetime import timedelta
import json
from openai import OpenAI, Timeout
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
# Set a strong, random secret key for session management, preferably from an environment variable
app.secret_key = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))

# Configure session cookie settings for security and functionality
app.config.update(
    SESSION_COOKIE_SECURE=os.getenv("FLASK_ENV") == "production",  # Use secure cookies if in production (HTTPS)
    SESSION_COOKIE_HTTPONLY=True,  # Prevent client-side JavaScript from accessing the session cookie
    SESSION_COOKIE_SAMESITE='Lax', # Mitigate Cross-Site Request Forgery (CSRF) attacks
    PERMANENT_SESSION_LIFETIME=timedelta(weeks=1), # Set session duration
    SESSION_REFRESH_EACH_REQUEST=True # Refresh the session on each request
)

# Load the pre-configured Assistant ID from environment variables
ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")
if not ASSISTANT_ID:
    app.logger.critical("CRITICAL: OPENAI_ASSISTANT_ID not found in environment. The application cannot function.")

@app.before_request
def before_request_func():
    """
    Function executed before each request.
    Ensures that necessary session variables are initialized.
    """
    if 'thread_id' not in session:
        session['thread_id'] = None
    if 'openai_api_key' not in session:
        session['openai_api_key'] = None
    session.modified = True # Ensure changes to mutable session objects are saved

@app.route('/')
def home():
    """Renders the main HTML page for the HR Assistant chat interface."""
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_question_route():
    """
    Handles user questions by interacting with the HRAssistant and streaming the response.
    """
    if not ASSISTANT_ID:
        return jsonify({'error': 'Application is not configured correctly. The server is missing the Assistant ID.'}), 500

    data = request.get_json()
    question_text = data.get('question', '').strip()
    api_key_from_session = session.get('openai_api_key')

    if not question_text:
        return jsonify({'error': 'No se proporcionó ninguna pregunta. Por favor, ingrese su consulta.'}), 400
    
    if not api_key_from_session:
        return jsonify({'error': 'Clave API no configurada. Por favor, vaya a Configuración para ingresar su clave API.'}), 401

    try:
        # Initialize the assistant with the user's API key and the pre-configured Assistant ID
        assistant = HRAssistant(assistant_id=ASSISTANT_ID, api_key=api_key_from_session)
        
        # Get the conversation thread_id from the session.
        # If it doesn't exist, create a new one and save it to the session immediately.
        thread_id = session.get('thread_id')
        if not thread_id:
            thread_id = assistant.create_thread()
            session['thread_id'] = thread_id
            app.logger.info(f"Created and saved new thread ID to session: {thread_id}")

        # Define the generator function for streaming the response
        def generate_response_stream():
            try:
                # Get the response generator from the HRAssistant
                response_generator = assistant.ask_question(
                    question=question_text,
                    thread_id=thread_id
                )
                # Stream each token back to the client
                for token in response_generator:
                    yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Exception during response streaming: {str(stream_ex)}")
                error_data = json.dumps({'error': f"Stream Error: {stream_ex}"})
                yield f"data: {error_data}\n\n"
            finally:
                # Signal the end of the stream
                yield f"data: [DONE]\n\n"

        # Return the streaming response
        return Response(generate_response_stream(), mimetype='text/event-stream')
        
    except Exception as e:
        app.logger.error(f"General API Error in /ask route: {str(e)}", exc_info=True)
        return jsonify({'error': f"Ocurrió un error al generar la respuesta: {str(e)}"}), 500

@app.route('/translate', methods=['POST'])
def translate_text_route():
    """
    Translates a given text to a target language using the OpenAI API and streams the result.
    """
    data = request.get_json()
    text_to_translate = data.get('text', '').strip()
    target_language_key = data.get('target_language', 'english')
    source_language_key = data.get('source_language')
    api_key_from_session = session.get('openai_api_key')

    if not text_to_translate:
        return jsonify({'error': 'No text provided for translation.'}), 400

    error_messages_no_api_key_translate = {
        'english': "API key not configured. Please set it in Settings.",
        'spanish': "Clave API no configurada. Por favor, configúrela en Ajustes.",
        'chinese_simplified': "API 密钥未配置。请在“设置”中进行设置。(简)",
        'chinese_traditional': "API 金鑰未設定。請在「設定」中進行設定。(繁)"
    }
    if not api_key_from_session:
        error_msg = error_messages_no_api_key_translate.get(target_language_key, error_messages_no_api_key_translate['english'])
        return jsonify({'error': error_msg}), 401

    try:
        translation_client = OpenAI(api_key=api_key_from_session, timeout=Timeout(45.0, connect=5.0))
        
        language_names_for_openai_prompt = {
            "english": "English", "spanish": "Spanish",
            "chinese_simplified": "Simplified Chinese", "chinese_traditional": "Traditional Chinese"
        }
        
        prompt_target_language_name = language_names_for_openai_prompt.get(target_language_key, target_language_key.capitalize())
        
        # Build the prompt for the translation model
        if source_language_key and source_language_key in language_names_for_openai_prompt:
            prompt_source_language_name = language_names_for_openai_prompt[source_language_key]
            prompt_content = f"Translate the following text from {prompt_source_language_name} to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself.\n\nOriginal text:\n{text_to_translate}"
        else:
            prompt_content = f"Detect the language of the following text and then translate it to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself.\n\nText to translate:\n{text_to_translate}"
        
        # Create the streaming completion request
        response_stream = translation_client.chat.completions.create(
            model="gpt-4.1-mini-2025-04-14",
            messages=[
                {"role": "system", "content": "You are a highly proficient multilingual translator. Your task is to translate text accurately, maintaining all original formatting. Respond only with the translation itself."},
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.1, max_tokens=3500, stream=True
        )

        def generate_translation_stream():
            """Generator function to stream the translation response."""
            try:
                for chunk in response_stream:
                    if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Exception during translation stream: {str(stream_ex)}")
            finally:
                yield f"data: [DONE]\n\n"

        return Response(generate_translation_stream(), mimetype='text/event-stream')

    except Exception as e:
        app.logger.error(f"Translation API Error: {str(e)}", exc_info=True)
        error_msg_server = f"Translation error: {str(e)}"
        if "authentication" in str(e).lower() or "api key" in str(e).lower():
             error_msg_server = "La traducción falló debido a una clave API inválida o un problema de autenticación."
        return jsonify({'error': error_msg_server}), 500

@app.route('/set_api_key', methods=['POST'])
def set_api_key_route():
    """
    Sets or clears the OpenAI API key in the user's session.
    Validates the key by making a simple API call.
    """
    data = request.get_json()
    api_key_value = data.get('api_key', '').strip()
    
    try:
        if api_key_value:
            # Test the API key by making a simple call to list models
            test_client = OpenAI(api_key=api_key_value, timeout=Timeout(15.0, connect=5.0))
            test_client.models.list()
            
            # If the call is successful, store the key in the session
            session['openai_api_key'] = api_key_value
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key validated and stored successfully.'})
        else:
            # If the key is empty, clear it from the session
            session.pop('openai_api_key', None)
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key cleared successfully.'})
    except Exception as e: 
        # If validation fails, clear the key and return an error
        session.pop('openai_api_key', None)
        session.modified = True
        error_msg_server = "The provided API key is invalid. Please check your key and try again."
        app.logger.error(f"API Key Validation Error: {str(e)}", exc_info=True)
        return jsonify({'error': error_msg_server}), 400

@app.route('/clear', methods=['POST'])
def clear_conversation_route():
    """Clears the conversation history by resetting the thread ID in the session."""
    session['thread_id'] = None  # Reset the conversation thread
    session.modified = True
    language = request.json.get('language', 'english') if request.is_json else 'english'
    
    message_map = {
        'english': 'Conversation history has been cleared.',
        'spanish': 'El historial de la conversación ha sido reiniciado.',
        'chinese_simplified': '对话历史已清除。(简)',
        'chinese_traditional': '對話歷史已清除。(繁)'
    }
    response_message = message_map.get(language, message_map['english'])
    return jsonify({'status': 'success', 'message': response_message})

if __name__ == '__main__':
    # Get Flask settings from environment variables with defaults
    flask_debug = os.getenv("FLASK_DEBUG", "true").lower() in ['true', '1', 't']
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 8000))

    # Log application startup information
    app.logger.info(f"Starting Flask application. Debug mode: {flask_debug}")
    app.logger.info(f"Using Assistant ID: {ASSISTANT_ID}")
    app.logger.info(f"Access the app at http://{host}:{port}")
    
    # Run the Flask application
    app.run(
        debug=flask_debug,
        host=host, 
        port=port,
        threaded=True  # Use threading to handle multiple requests
    )
