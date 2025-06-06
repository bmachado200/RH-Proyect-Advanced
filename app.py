from flask import Flask, render_template, request, jsonify, session, Response
from query import HRAssistant # Import the HRAssistant CLASS
import os
import secrets
from datetime import timedelta
import json
from openai import OpenAI # OpenAI client for translation and API key validation
from dotenv import load_dotenv # For loading .env files

# Load environment variables (e.g., for FLASK_SECRET_KEY and OPENAI_API_KEY if needed for HRAssistant init)
load_dotenv()

app = Flask(__name__)
# It's crucial to set a strong, random secret key in a production environment,
# preferably through an environment variable.
app.secret_key = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))

# Configure session cookie settings for security and functionality
app.config.update(
    SESSION_COOKIE_SECURE=os.getenv("FLASK_ENV", "development") == "production", # True if using HTTPS
    SESSION_COOKIE_HTTPONLY=True,  # Prevent client-side JS access to the session cookie
    SESSION_COOKIE_SAMESITE='Lax', # Mitigate CSRF attacks
    PERMANENT_SESSION_LIFETIME=timedelta(weeks=1), # Session duration
    SESSION_REFRESH_EACH_REQUEST=True # Refresh session on each request
)

# --- Initialize HRAssistant ---
# Retrieve the API key that might have been set during HRAssistant's own initialization
# or expect it to be passed to its methods.
# If HRAssistant requires an API key at initialization for some base functionality (e.g. loading models),
# ensure it's provided here. query.py's HRAssistant takes an optional default_api_key.
OPENAI_API_KEY_FOR_HR_ASSISTANT = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY_FOR_HR_ASSISTANT:
    # This is a critical setup error if HRAssistant absolutely needs a key at init
    # For now, query.py's HRAssistant allows it to be None at init, relying on session keys for calls.
    app.logger.warning("OPENAI_API_KEY not found in environment. "
                       "HRAssistant will rely on API keys set in user sessions for its operations.")

# Create an instance of the HRAssistant.
# The HRAssistant in query.py is designed to take a default_api_key,
# but operations like ask_question will use the key from the session.
assistant = HRAssistant(default_api_key=OPENAI_API_KEY_FOR_HR_ASSISTANT)
# Note: If HRAssistant needed to load models or connect to ChromaDB using an API key at startup
# *before* any user interaction, then OPENAI_API_KEY_FOR_HR_ASSISTANT would be critical here.
# The current query.py structure defers API key usage to method calls (like _get_chroma_collection).

@app.before_request
def before_request_func():
    """Ensure session variables are initialized before each request."""
    if 'conversation' not in session:
        session['conversation'] = []
    if 'openai_api_key' not in session:
        session['openai_api_key'] = None # Explicitly None if not set
    session.modified = True # Ensure changes to mutable session objects are saved

@app.route('/')
def home():
    """Render the main HTML page for the HR Assistant."""
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_question_route(): # Renamed to avoid conflict with HRAssistant.ask_question
    """
    Handle user questions, interact with the HRAssistant,
    and stream the response back to the client.
    """
    data = request.get_json()
    question_text = data.get('question', '').strip()
    # Language key from frontend (e.g., 'english', 'spanish', 'chinese_simplified')
    language = data.get('language', 'english')
    api_key_from_session = session.get('openai_api_key')

    # Define error messages for different languages for better UX
    error_messages_no_question = {
        'english': "No question provided. Please enter your query.",
        'spanish': "No se proporcionó ninguna pregunta. Por favor, ingrese su consulta.",
        'chinese_simplified': "未提供问题。请输入您的问题。(简)",
        'chinese_traditional': "未提供問題。請輸入您的問題。(繁)"
    }
    error_messages_no_api_key = {
        'english': "API key not configured. Please go to Settings to enter your API key.",
        'spanish': "Clave API no configurada. Por favor, vaya a Configuración para ingresar su clave API.",
        'chinese_simplified': "API 密钥未配置。请前往“设置”输入您的 API 密钥。(简)",
        'chinese_traditional': "API 金鑰未設定。請前往「設定」輸入您的 API 金鑰。(繁)"
    }
    error_messages_generation = {
        'english': "An error occurred while generating the response",
        'spanish': "Ocurrió un error al generar la respuesta",
        'chinese_simplified': "生成响应时出错 (简)",
        'chinese_traditional': "產生回覆時出錯 (繁)"
    }

    # Validate input: question text
    if not question_text:
        error_msg = error_messages_no_question.get(language, error_messages_no_question['english'])
        return jsonify({'error': error_msg}), 400
    
    # Validate input: API key
    if not api_key_from_session:
        error_msg = error_messages_no_api_key.get(language, error_messages_no_api_key['english'])
        return jsonify({'error': error_msg}), 401 # 401 Unauthorized

    try:
        # Append user's question to the conversation history in the session
        session['conversation'].append({
            'role': 'user', 'content': question_text, 'language': language
        })
        # Prune conversation history if it gets too long
        if len(session['conversation']) > 20: # Keep last 20 messages (10 pairs)
            session['conversation'] = session['conversation'][-20:]
        session.modified = True
        
        # Call the HRAssistant to get a response stream
        # Pass only the most recent part of the conversation for context (e.g., last 2 pairs)
        # The HRAssistant instance is now correctly initialized as 'assistant' at the module level.
        response_stream = assistant.ask_question( # This calls the method of the HRAssistant instance
            question=question_text,
            language=language, 
            conversation_history=session['conversation'][-4:], # Pass last 4 items (2 user, 2 assistant potentially)
            api_key=api_key_from_session # HRAssistant.ask_question requires the API key
        )
        
        # Handle cases where ask_question returns an error string directly (e.g., config error in HRAssistant)
        if isinstance(response_stream, str):
            api_key_error_substrings = [
                "API key not provided", "Clave API no proporcionada", 
                "API 密钥未提供", "API 金鑰未設定", # Error messages from HRAssistant for API key
                "API key not configured", # From app.py itself, though HRAssistant might also return similar
                "Invalid API key", "Invalid API key" # Common API key errors
            ]
            # Check if the error is specifically about the API key
            if any(sub.lower() in response_stream.lower() for sub in api_key_error_substrings):
                 return jsonify({'error': response_stream}), 401 # Unauthorized if API key issue from HRAssistant
            return jsonify({'error': response_stream}), 500 # General server error from HRAssistant
            
        # Generator function to stream the response
        def generate_response_stream():
            full_response_content = ""
            try:
                for token in response_stream:
                    full_response_content += token
                    yield f"data: {json.dumps({'token': token})}\n\n"
                
                # After streaming is complete, save the assistant's full response to the session
                # This requires being within an application context.
                with app.app_context():
                    # It's good practice to fetch the session again if modifying it in a nested function/context,
                    # though in this specific Flask streaming setup, `session` from the outer scope might still be valid.
                    current_session_in_generator = session 
                    current_session_in_generator['conversation'].append({
                        'role': 'assistant', 'content': full_response_content, 'language': language
                    })
                    if len(current_session_in_generator['conversation']) > 20:
                        current_session_in_generator['conversation'] = current_session_in_generator['conversation'][-20:]
                    current_session_in_generator.modified = True
            except GeneratorExit:
                # This occurs if the client disconnects before the stream is fully sent.
                app.logger.info("Client disconnected during response stream.")
            except Exception as stream_ex:
                app.logger.error(f"Exception during response streaming: {str(stream_ex)}")
                # Optionally, yield an error message to the client if the stream breaks
                # yield f"data: {json.dumps({'error': 'Error during stream.'})}\n\n"
            finally:
                # Send a [DONE] message to clearly signal the end of the stream to the client.
                yield f"data: [DONE]\n\n"

        return Response(generate_response_stream(), mimetype='text/event-stream')
        
    except Exception as e:
        # General exception handling for the /ask route
        error_msg = error_messages_generation.get(language, error_messages_generation['english'])
        app.logger.error(f"General API Error in /ask route for language {language}: {str(e)}", exc_info=True)
        return jsonify({'error': f"{error_msg}: {str(e)}"}), 500

@app.route('/translate', methods=['POST'])
def translate_text_route():
    """
    Translate a given text to a target language using OpenAI, streaming the response.
    The source language can be provided or detected by the AI.
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
        error_msg = error_messages_no_api_key_translate.get(
            target_language_key, error_messages_no_api_key_translate['english']
        )
        return jsonify({'error': error_msg}), 401

    try:
        translation_client = OpenAI(api_key=api_key_from_session)
        
        language_names_for_openai_prompt = {
            "english": "English",
            "spanish": "Spanish",
            "chinese_simplified": "Simplified Chinese",
            "chinese_traditional": "Traditional Chinese"
        }
        
        prompt_target_language_name = language_names_for_openai_prompt.get(
            target_language_key, target_language_key.capitalize()
        )
        
        if source_language_key and source_language_key in language_names_for_openai_prompt:
            prompt_source_language_name = language_names_for_openai_prompt[source_language_key]
            prompt_content = (
                f"Translate the following text from {prompt_source_language_name} to {prompt_target_language_name}. "
                f"Preserve all original formatting, including markdown, HTML tags, lists, newlines, and special characters. "
                f"Respond ONLY with the translated text itself, without any surrounding text, explanations, or conversational remarks.\n\n"
                f"Original text:\n{text_to_translate}"
            )
        else:
            prompt_content = (
                f"Detect the language of the following text and then translate it to {prompt_target_language_name}. "
                f"Preserve all original formatting, including markdown, HTML tags, lists, newlines, and special characters. "
                f"Respond ONLY with the translated text itself, without any surrounding text, explanations, or conversational remarks.\n\n"
                f"Text to translate:\n{text_to_translate}"
            )
        
        # The key change is to add stream=True
        response_stream = translation_client.chat.completions.create(
            model=assistant.OPENAI_CHAT_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a highly proficient multilingual translator. Your task is to translate the given text accurately, "
                        "maintaining all original formatting (including markdown, HTML tags, lists, newlines, etc.). "
                        "Respond only with the translation itself, without any surrounding text, explanations, or conversational remarks."
                    )
                },
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.1,
            max_tokens=3500,
            stream=True  # Enable streaming
        )

        def generate_translation_stream():
            """Generator function to stream the translation response."""
            try:
                for chunk in response_stream:
                    if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        # Yield each token in the Server-Sent Events (SSE) format
                        yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Exception during translation streaming: {str(stream_ex)}")
            finally:
                # Signal the end of the stream to the client
                yield f"data: [DONE]\n\n"

        # Return a streaming response
        return Response(generate_translation_stream(), mimetype='text/event-stream')

    except Exception as e:
        app.logger.error(f"Translation API Error: {str(e)}", exc_info=True)
        error_msg_server = f"Translation error: {str(e)}"
        if "authentication" in str(e).lower() or "api key" in str(e).lower():
             error_msg_server = "Translation failed due to an invalid API key or authentication issue. Please check your API key in Settings."
        # This error will now be caught by the frontend's `.catch()` block
        return jsonify({'error': error_msg_server}), 500


@app.route('/set_api_key', methods=['POST'])
def set_api_key_route():
    """
    Set or clear the OpenAI API key in the user's session.
    Validates the key by making a simple API call.
    """
    data = request.get_json()
    api_key_value = data.get('api_key', '').strip()
    
    try:
        if api_key_value: # If a key is provided, validate and store it
            # Test the API key by making a simple, low-cost request
            test_client = OpenAI(api_key=api_key_value)
            test_client.models.list() # This will raise an AuthenticationError if the key is invalid
            
            session['openai_api_key'] = api_key_value
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key validated and stored successfully.'})
        else: # If an empty key is provided, clear it from the session
            session.pop('openai_api_key', None) # Remove the key if it exists
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key cleared successfully.'})
    except Exception as e: 
        # Catch errors from OpenAI client initialization or the models.list() call (e.g., AuthenticationError)
        session.pop('openai_api_key', None) # Ensure an invalid key is not stored
        session.modified = True
        error_msg_server = f"Invalid API key: {str(e)}"
        # Provide a more user-friendly message for common authentication errors
        if "authentication" in str(e).lower() or "Incorrect API key" in str(e).lower():
            error_msg_server = "The provided API key is invalid. Please check your key and try again."
        app.logger.error(f"API Key Validation Error: {str(e)}", exc_info=True)
        return jsonify({'error': error_msg_server}), 400 # 400 Bad Request for invalid key

@app.route('/clear', methods=['POST'])
def clear_conversation_route():
    """Clear the conversation history from the session."""
    session['conversation'] = []
    session.modified = True
    # Determine the language for the response message from the request or default to English
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
    # For production, FLASK_ENV should be 'production' and FLASK_DEBUG 'False'.
    # These should ideally be set via environment variables.
    flask_debug = os.getenv("FLASK_DEBUG", "true").lower() in ['true', '1', 't'] # More robust boolean check
    
    # Set host to '0.0.0.0' to make the app accessible on your network.
    # You will be able to access it using your computer's local IP address.
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 8000))

    app.logger.info(f"Starting Flask app. Debug mode: {flask_debug}")
    app.logger.info(f"Access the app at http://127.0.0.1:{port} or from other devices on your network via your computer's IP address.")
    
    app.run(
        debug=flask_debug,
        host=host, 
        port=port,
        threaded=True # Handle multiple requests concurrently
    )
