from flask import Flask, render_template, request, jsonify, session, Response
from query import HRAssistant # Importar la CLASE HRAssistant
import os
import secrets
from datetime import timedelta
import json
from openai import OpenAI, Timeout # Cliente de OpenAI para traducción y validación de clave API
from dotenv import load_dotenv # Para cargar archivos .env

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
# Es crucial establecer una clave secreta fuerte y aleatoria en un entorno de producción,
# preferiblemente a través de una variable de entorno.
app.secret_key = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))

# Configurar los ajustes de la cookie de sesión para seguridad y funcionalidad
app.config.update(
    SESSION_COOKIE_SECURE=os.getenv("FLASK_ENV", "development") == "production", # True si se usa HTTPS
    SESSION_COOKIE_HTTPONLY=True,  # Prevenir acceso a la cookie de sesión desde el lado del cliente (JS)
    SESSION_COOKIE_SAMESITE='Lax', # Mitigar ataques CSRF
    PERMANENT_SESSION_LIFETIME=timedelta(weeks=1), # Duración de la sesión
    SESSION_REFRESH_EACH_REQUEST=True # Refrescar la sesión en cada petición
)

# --- Inicializar HRAssistant ---
# MODIFICACIÓN: Esta clave es para ChromaDB y debe ser la misma que usó loader.py
OPENAI_API_KEY_FOR_CHROMA = os.getenv("OPENAI_API_KEY")

assistant = None
if not OPENAI_API_KEY_FOR_CHROMA:
    # Esto ahora es un error crítico para el arranque de la aplicación.
    app.logger.error("CRÍTICO: OPENAI_API_KEY para ChromaDB no encontrada en el entorno. La aplicación no puede arrancar correctamente.")
else:
    try:
        # MODIFICACIÓN: Pasamos la clave específica para ChromaDB al inicializar.
        assistant = HRAssistant(chroma_api_key=OPENAI_API_KEY_FOR_CHROMA)
    except Exception as e:
        app.logger.error(f"CRÍTICO: Falló la inicialización de HRAssistant. Error: {e}")


@app.before_request
def before_request_func():
    """Asegura que las variables de sesión estén inicializadas antes de cada petición."""
    if 'conversation' not in session:
        session['conversation'] = []
    if 'openai_api_key' not in session:
        session['openai_api_key'] = None # Explícitamente None si no está establecida
    session.modified = True # Asegura que los cambios en objetos mutables de la sesión se guarden

@app.route('/')
def home():
    """Renderiza la página HTML principal para el Asistente de RH."""
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_question_route():
    """
    Maneja las preguntas del usuario, interactúa con el HRAssistant,
    y transmite la respuesta de vuelta al cliente.
    """
    # MODIFICACIÓN: Si el asistente no se pudo inicializar, retorna un error
    if assistant is None:
        return jsonify({'error': 'La aplicación no está configurada correctamente. Falta la clave API del servidor.'}), 500

    data = request.get_json()
    question_text = data.get('question', '').strip()
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

    if not question_text:
        error_msg = error_messages_no_question.get(language, error_messages_no_question['english'])
        return jsonify({'error': error_msg}), 400
    
    if not api_key_from_session:
        error_msg = error_messages_no_api_key.get(language, error_messages_no_api_key['english'])
        return jsonify({'error': error_msg}), 401 # 401 Unauthorized

    try:
        session['conversation'].append({'role': 'user', 'content': question_text, 'language': language})
        if len(session['conversation']) > 20:
            session['conversation'] = session['conversation'][-20:]
        session.modified = True
        
        # MODIFICACIÓN: Llamamos a ask_question pasando la clave del usuario en el parámetro `chat_api_key`.
        response_stream = assistant.ask_question(
            question=question_text,
            language=language, 
            conversation_history=session['conversation'][-4:],
            chat_api_key=api_key_from_session # El nombre del parámetro cambió
        )
        
        if isinstance(response_stream, str):
            api_key_error_substrings = [
                "api key not provided", "clave api no proporcionada", "api 密钥未提供", "api 金鑰未設定",
                "api key not configured", "invalid api key"
            ]
            if any(sub.lower() in response_stream.lower() for sub in api_key_error_substrings):
                 return jsonify({'error': response_stream}), 401
            return jsonify({'error': response_stream}), 500
            
        def generate_response_stream():
            full_response_content = ""
            try:
                for token in response_stream:
                    full_response_content += token
                    yield f"data: {json.dumps({'token': token})}\n\n"
                
                with app.app_context():
                    session['conversation'].append({
                        'role': 'assistant', 'content': full_response_content, 'language': language
                    })
                    if len(session['conversation']) > 20:
                        session['conversation'] = session['conversation'][-20:]
                    session.modified = True
            except GeneratorExit:
                app.logger.info("El cliente se desconectó durante la transmisión de la respuesta.")
            except Exception as stream_ex:
                app.logger.error(f"Excepción durante la transmisión de la respuesta: {str(stream_ex)}")
            finally:
                yield f"data: [DONE]\n\n"

        return Response(generate_response_stream(), mimetype='text/event-stream')
        
    except Exception as e:
        error_msg = error_messages_generation.get(language, error_messages_generation['english'])
        app.logger.error(f"Error General de API en la ruta /ask para el idioma {language}: {str(e)}", exc_info=True)
        return jsonify({'error': f"{error_msg}: {str(e)}"}), 500

@app.route('/translate', methods=['POST'])
def translate_text_route():
    """
    Traduce un texto dado a un idioma objetivo usando OpenAI, transmitiendo la respuesta.
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
        
        if source_language_key and source_language_key in language_names_for_openai_prompt:
            prompt_source_language_name = language_names_for_openai_prompt[source_language_key]
            prompt_content = f"Translate the following text from {prompt_source_language_name} to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself.\n\nOriginal text:\n{text_to_translate}"
        else:
            prompt_content = f"Detect the language of the following text and then translate it to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself.\n\nText to translate:\n{text_to_translate}"
        
        response_stream = translation_client.chat.completions.create(
            model=assistant.OPENAI_CHAT_MODEL if assistant else "gpt-4.1-mini-2025-04-14",
            messages=[
                {"role": "system", "content": "You are a highly proficient multilingual translator. Your task is to translate text accurately, maintaining all original formatting. Respond only with the translation itself."},
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.1, max_tokens=3500, stream=True
        )

        def generate_translation_stream():
            """Función generadora para transmitir la respuesta de traducción."""
            try:
                for chunk in response_stream:
                    if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Excepción durante la transmisión de la traducción: {str(stream_ex)}")
            finally:
                yield f"data: [DONE]\n\n"

        return Response(generate_translation_stream(), mimetype='text/event-stream')

    except Exception as e:
        app.logger.error(f"Error de API de Traducción: {str(e)}", exc_info=True)
        error_msg_server = f"Translation error: {str(e)}"
        if "authentication" in str(e).lower() or "api key" in str(e).lower():
             error_msg_server = "La traducción falló debido a una clave API inválida o un problema de autenticación."
        return jsonify({'error': error_msg_server}), 500


@app.route('/set_api_key', methods=['POST'])
def set_api_key_route():
    """
    Establece o elimina la clave API de OpenAI en la sesión del usuario.
    Valida la clave haciendo una llamada simple a la API.
    """
    data = request.get_json()
    api_key_value = data.get('api_key', '').strip()
    
    try:
        if api_key_value:
            test_client = OpenAI(api_key=api_key_value, timeout=Timeout(15.0, connect=5.0))
            test_client.models.list()
            
            session['openai_api_key'] = api_key_value
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key validated and stored successfully.'})
        else:
            session.pop('openai_api_key', None)
            session.modified = True
            return jsonify({'status': 'success', 'message': 'API key cleared successfully.'})
    except Exception as e: 
        session.pop('openai_api_key', None)
        session.modified = True
        error_msg_server = "The provided API key is invalid. Please check your key and try again."
        app.logger.error(f"API Key Validation Error: {str(e)}", exc_info=True)
        return jsonify({'error': error_msg_server}), 400

@app.route('/clear', methods=['POST'])
def clear_conversation_route():
    """Limpia el historial de la conversación de la sesión."""
    session['conversation'] = []
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
    flask_debug = os.getenv("FLASK_DEBUG", "true").lower() in ['true', '1', 't']
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 8000))

    app.logger.info(f"Iniciando aplicación Flask. Modo de depuración: {flask_debug}")
    app.logger.info(f"Accede a la app en http://127.0.0.1:{port} o desde otros dispositivos en tu red a través de la IP de tu computadora.")
    
    app.run(
        debug=flask_debug,
        host=host, 
        port=port,
        threaded=True
    )
