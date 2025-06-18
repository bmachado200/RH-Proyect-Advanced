import os
import secrets
from datetime import timedelta
import json
from flask import Flask, render_template, request, jsonify, session, Response
from markupsafe import Markup
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
# --- Nuevas importaciones para leer archivos DOCX y PDF ---
import docx
import fitz

from query import HRAssistant
from openai import OpenAI, Timeout

# Carga las variables de entorno
load_dotenv()

app = Flask(__name__)

# --- CONFIGURACIÓN DE LA CARPETA DE DOCUMENTOS LOCALES ---
DOCUMENT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'documentos_locales')
app.config['DOCUMENT_FOLDER'] = DOCUMENT_FOLDER
if not os.path.exists(DOCUMENT_FOLDER):
    os.makedirs(DOCUMENT_FOLDER)
    app.logger.info(f"Carpeta de documentos creada en: {DOCUMENT_FOLDER}")

# --- Configuración de Sesión y Asistente (sin cambios) ---
app.secret_key = os.getenv("FLASK_SECRET_KEY", secrets.token_hex(32))
app.config.update(
    SESSION_COOKIE_SECURE=os.getenv("FLASK_ENV") == "production",
    SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE='Lax',
    PERMANENT_SESSION_LIFETIME=timedelta(weeks=1), SESSION_REFRESH_EACH_REQUEST=True
)
ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")
if not ASSISTANT_ID:
    app.logger.critical("CRÍTICO: OPENAI_ASSISTANT_ID no encontrado.")

@app.before_request
def before_request_func():
    if 'thread_id' not in session: session['thread_id'] = None
    if 'openai_api_key' not in session: session['openai_api_key'] = None
    session.modified = True

# --- FUNCIONES AUXILIARES PARA LEER DOCUMENTOS ---
def read_docx_text(file_path):
    try:
        doc = docx.Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        app.logger.error(f"Error al leer archivo DOCX {file_path}: {e}")
        return None

def read_pdf_text(file_path):
    try:
        doc = fitz.open(file_path)
        return "\n".join([page.get_text() for page in doc])
    except Exception as e:
        app.logger.error(f"Error al leer archivo PDF {file_path}: {e}")
        return None

# ==============================================================================
# RUTAS DE LA APLICACIÓN
# ==============================================================================
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_question_route():
    if not ASSISTANT_ID: return jsonify({'error': "Aplicación no configurada."}), 500
    data = request.get_json()
    question_text, api_key_from_session = data.get('question', '').strip(), session.get('openai_api_key')
    if not question_text: return jsonify({'error': 'No se proporcionó pregunta.'}), 400
    if not api_key_from_session: return jsonify({'error': 'Clave API no configurada.'}), 401
    try:
        assistant = HRAssistant(assistant_id=ASSISTANT_ID, api_key=api_key_from_session)
        thread_id = session.get('thread_id')
        if not thread_id:
            thread_id = assistant.create_thread()
            session['thread_id'] = thread_id
            app.logger.info(f"Nuevo ID de hilo creado: {thread_id}")
        def generate_response_stream():
            try:
                for data_json in assistant.ask_question(question=question_text, thread_id=thread_id):
                    yield f"data: {data_json}\n\n"
            finally:
                yield "data: [DONE]\n\n"
        return Response(generate_response_stream(), mimetype='text/event-stream')
    except Exception as e:
        app.logger.error(f"Error en /ask: {e}", exc_info=True)
        return jsonify({'error': f"Error al generar respuesta: {e}"}), 500

# --- RUTA MODIFICADA: `quote` ya no es obligatorio ---
@app.route('/view_document')
def view_document():
    """
    Lee un documento local y lo muestra en una página HTML.
    Si se proporciona una cita, intenta resaltarla.
    """
    filename = request.args.get('file')
    quote = request.args.get('quote', '') # <--- CAMBIO CLAVE: Usa cadena vacía si no existe

    if not filename: # Solo el filename es estrictamente obligatorio
        return "Falta el parámetro de archivo.", 400

    safe_filename = filename
    file_path = os.path.join(app.config['DOCUMENT_FOLDER'], safe_filename)

    if not os.path.exists(file_path):
        app.logger.error(f"Archivo no encontrado en la carpeta local: {safe_filename}")
        return "Archivo no encontrado en el servidor.", 404

    full_text = ""
    if safe_filename.lower().endswith('.docx'):
        full_text = read_docx_text(file_path)
    elif safe_filename.lower().endswith('.pdf'):
        full_text = read_pdf_text(file_path)
    else:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                full_text = f.read()
        except Exception as e:
            app.logger.error(f"Error al leer archivo de texto {file_path}: {e}")
            full_text = None

    if full_text is None:
        return "No se pudo leer el contenido del documento o el formato no es compatible.", 500

    escaped_text = Markup.escape(full_text)
    
    # Solo intentar resaltar si 'quote' tiene contenido
    if quote:
        escaped_quote = Markup.escape(quote)
        highlighted_text = escaped_text.replace(escaped_quote, f'<mark id="highlight">{escaped_quote}</mark>', 1)
    else:
        highlighted_text = escaped_text # Mostrar el texto sin resaltar si no hay cita
    
    return render_template('highlight_view.html', filename=safe_filename, content=highlighted_text)


@app.route('/set_api_key', methods=['POST'])
def set_api_key_route():
    data = request.get_json()
    api_key_value = data.get('api_key', '').strip()
    try:
        if api_key_value:
            test_client = OpenAI(api_key=api_key_value, timeout=Timeout(15.0, connect=5.0))
            test_client.models.list()
            
            session['openai_api_key'] = api_key_value
            session.modified = True
            return jsonify({'status': 'success', 'message': 'Clave API validada y almacenada con éxito.'})
        else:
            session.pop('openai_api_key', None)
            session.modified = True
            return jsonify({'status': 'success', 'message': 'Clave API borrada con éxito.'})
    except Exception as e: 
        session.pop('openai_api_key', None)
        session.modified = True
        error_msg_server = "La clave API proporcionada no es válida. Por favor, comprueba tu clave e inténtalo de nuevo."
        app.logger.error(f"Error de Validación de Clave API: {str(e)}", exc_info=True)
        return jsonify({'error': error_msg_server}), 400

@app.route('/translate', methods=['POST'])
def translate_text_route():
    data = request.get_json()
    text_to_translate = data.get('text', '').strip()
    target_language_key = data.get('target_language', 'english')
    source_language_key = data.get('source_language')
    api_key_from_session = session.get('openai_api_key')

    if not text_to_translate:
        return jsonify({'error': 'No se proporcionó texto para traducir.'}), 400
    
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
            prompt_content = f"Translate the following text from {prompt_source_language_name} to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself. Dont transalte the references.\n\nOriginal text:\n{text_to_translate}"
        else:
            prompt_content = f"Detect the language of the following text and then translate it to {prompt_target_language_name}. Preserve all original formatting. Respond ONLY with the translated text itself. Dont transalte the references. \n\nText to translate:\n{text_to_translate}"
         
        response_stream = translation_client.chat.completions.create(
            model="gpt-4.1-mini-2025-04-14",
            messages=[
                {"role": "system", "content": "You are a highly proficient multilingual translator. Your task is to translate text accurately, maintaining all original formatting. Respond only with the translation itself. Dont translate the references."},
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.1, max_tokens=3500, stream=True
        )

        def generate_translation_stream():
            try:
                for chunk in response_stream:
                    if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Excepción durante el stream de traducción: {str(stream_ex)}")
            finally:
                yield f"data: [DONE]\n\n"
        
        return Response(generate_translation_stream(), mimetype='text/event-stream')
    except Exception as e:
        app.logger.error(f"Error de API de traducción: {str(e)}", exc_info=True)
        error_msg_server = f"Error de traducción: {str(e)}"
        if "authentication" in str(e).lower() or "api key" in str(e).lower():
             error_msg_server = "La traducción falló debido a una clave API inválida o un problema de autenticación."
        return jsonify({'error': error_msg_server}), 401

@app.route('/clear', methods=['POST'])
def clear_conversation_route():
    session['thread_id'] = None
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

@app.route('/summarize', methods=['POST'])
def summarize_text_route():
    data = request.get_json()
    text_to_summarize = data.get('text', '').strip()
    language = data.get('language', 'spanish') 
    api_key_from_session = session.get('openai_api_key')

    if not text_to_summarize:
        return jsonify({'error': 'No se proporcionó texto para resumir.'}), 400
    if not api_key_from_session:
        return jsonify({'error': 'Clave API no configurada. Por favor, configúrela en Ajustes.'}), 401

    prompts = {
        'english': {'system': "You are an expert assistant at summarizing information clearly and concisely.", 'user': "Provide a clear and concise summary of the following text. The summary MUST be written in English.\n\nOriginal text:\n"},
        'spanish': {'system': "Eres un asistente experto en resumir información de manera clara y concisa.", 'user': "Proporciona un resumen conciso y claro del siguiente texto. El resumen DEBE estar escrito en Español.\n\nTexto original:\n"},
        'chinese_simplified': {'system': "您是一位精通清晰简洁总结信息的专家助理。", 'user': "请对以下文本进行清晰简洁的总结。该总结必须用简体中文书写。\n\n原文：\n"},
        'chinese_traditional': {'system': "您是一位精通清晰簡潔總結資訊的專家助理。", 'user': "請對以下文本進行清晰簡潔的總結。該總結必須用繁體中文書寫。\n\n原文：\n"}
    }
    selected_prompt = prompts.get(language, prompts['spanish'])
    
    try:
        summary_client = OpenAI(api_key=api_key_from_session, timeout=Timeout(45.0, connect=5.0))
        prompt_content = f"{selected_prompt['user']}{text_to_summarize}"
        
        response_stream = summary_client.chat.completions.create(
            model="gpt-4.1-mini-2025-04-14",
            messages=[
                {"role": "system", "content": selected_prompt['system']},
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.2, max_tokens=500, stream=True
        )

        def generate_summary_stream():
            try:
                for chunk in response_stream:
                    if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        yield f"data: {json.dumps({'token': token})}\n\n"
            except Exception as stream_ex:
                app.logger.error(f"Excepción durante el stream de resumen: {str(stream_ex)}")
                error_data = json.dumps({'error': f"Error de Stream: {stream_ex}"})
                yield f"data: {error_data}\n\n"
            finally:
                yield f"data: [DONE]\n\n"
        
        return Response(generate_summary_stream(), mimetype='text/event-stream')
    except Exception as e:
        app.logger.error(f"Error de API de resumen: {str(e)}", exc_info=True)
        return jsonify({'error': f"Error de resumen: {str(e)}"}), 500


# ==============================================================================
# SECCIÓN 5: PUNTO DE ENTRADA DE LA APLICACIÓN
# ==============================================================================
if __name__ == '__main__':
    flask_debug = os.getenv("FLASK_DEBUG", "true").lower() in ['true', '1', 't']
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 8000))

    app.logger.info(f"Iniciando aplicación Flask. Modo de depuración: {flask_debug}")
    app.logger.info(f"Accede a la aplicación en http://{host}:{port}")
    
    app.run(
        debug=flask_debug,
        host=host, 
        port=port,
        threaded=True
    )
