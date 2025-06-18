import os
import time
from openai import OpenAI, Timeout
from typing import Generator
import logging
import json

# --- CONFIGURACIÓN DEL LOGGING ---
# Configura el logging para mostrar información útil durante la ejecución,
# incluyendo la hora, el nivel de severidad, el módulo y el mensaje.
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(module)s - %(message)s')
logger = logging.getLogger(__name__)

class HRAssistant:
    """
    Esta clase gestiona las interacciones con un Asistente de OpenAI específico.
    Encapsula la lógica para crear hilos de conversación, hacer preguntas
    y procesar las respuestas en streaming, incluyendo las citas a documentos.
    """
    def __init__(self, assistant_id: str, api_key: str):
        """
        Inicializa el cliente de OpenAI con el ID del Asistente y la clave API.
        
        Args:
            assistant_id (str): El ID único del Asistente de OpenAI que se va a utilizar.
            api_key (str): La clave API de OpenAI del usuario para la autenticación.
        
        Raises:
            ValueError: Si el ID del Asistente o la clave API no se proporcionan.
        """
        if not assistant_id:
            raise ValueError("Se requiere un ID de Asistente para la inicialización.")
        if not api_key:
            raise ValueError("Se requiere una clave API de OpenAI para la inicialización.")
            
        self.assistant_id = assistant_id
        # Configura el cliente de OpenAI con la clave API y un tiempo de espera para las solicitudes.
        self.client = OpenAI(api_key=api_key, timeout=Timeout(30.0, connect=5.0))
        logger.info(f"HRAssistant inicializado para el assistant_id: {self.assistant_id}")

    def create_thread(self) -> str:
        """
        Crea un nuevo hilo de conversación. Cada hilo es aislado y mantiene
        su propio historial de mensajes.
        
        Returns:
            str: El ID del nuevo hilo de conversación creado.
        
        Raises:
            Exception: Si la creación del hilo falla por cualquier motivo.
        """
        try:
            thread = self.client.beta.threads.create()
            logger.info(f"Nuevo hilo creado con ID: {thread.id}")
            return thread.id
        except Exception as e:
            logger.error(f"No se pudo crear el hilo: {e}", exc_info=True)
            raise

    def ask_question(self, question: str, thread_id: str) -> Generator[str, None, None]:
        """
        Hace una pregunta en un hilo específico, procesa la respuesta en streaming
        y extrae las anotaciones de citas de archivos al final.
        
        Args:
            question (str): La pregunta del usuario.
            thread_id (str): El ID del hilo donde se hará la pregunta.
            
        Yields:
            str: Una cadena JSON para cada evento (ya sea un 'token' de texto,
                 o 'annotations' con las citas).
        """
        if not thread_id:
            raise ValueError("Se requiere un thread_id para hacer una pregunta.")

        try:
            # Agrega el mensaje del usuario al hilo de conversación.
            self.client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content=question
            )
            logger.debug(f"Mensaje añadido al hilo {thread_id}: '{question}'")

            # Ejecuta el Asistente y procesa la respuesta en streaming.
            with self.client.beta.threads.runs.stream(
                thread_id=thread_id,
                assistant_id=self.assistant_id,
            ) as stream:
                for event in stream:
                    # Gestiona los nuevos tokens de texto que van llegando.
                    if event.event == 'thread.message.delta' and event.data.delta.content:
                        token = event.data.delta.content[0].text.value
                        if token:
                            yield json.dumps({'type': 'token', 'value': token})
                    
                    # Una vez que el mensaje está completo, lo recupera para obtener las anotaciones.
                    elif event.event == 'thread.message.completed':
                        message = self.client.beta.threads.messages.retrieve(
                            message_id=event.data.id,
                            thread_id=thread_id
                        )
                        
                        annotations = []
                        for content_block in message.content:
                            if content_block.type == 'text':
                                for ann in content_block.text.annotations:
                                    if ann.type == 'file_citation':
                                        try:
                                            # Recupera los detalles del archivo (como el nombre) para mostrarlos.
                                            cited_file = self.client.files.retrieve(ann.file_citation.file_id)
                                            
                                            # --- CORRECCIÓN ---
                                            # Se usa getattr para obtener 'quote' de forma segura. Si no existe,
                                            # se asigna un string vacío. Esto evita el error.
                                            quote = getattr(ann.file_citation, 'quote', '')

                                            annotations.append({
                                                'text_to_replace': ann.text,
                                                'file_id': cited_file.id,
                                                'file_name': cited_file.filename,
                                                'quote': quote
                                            })
                                        except Exception as file_error:
                                            logger.error(f"No se pudieron recuperar los detalles del archivo para {ann.file_citation.file_id}: {file_error}")
                        
                        # Si hay anotaciones, las envía al frontend.
                        if annotations:
                            yield json.dumps({'type': 'annotations', 'data': annotations})

            logger.info(f"Se completó el streaming de la respuesta para el hilo {thread_id}")

        except Exception as e:
            logger.error(f"Ocurrió un error inesperado en ask_question: {e}", exc_info=True)
            error_payload = json.dumps({'type': 'error', 'message': f"❌ Ocurrió un error: {str(e)}"})
            yield error_payload

# --- BLOQUE DE EJECUCIÓN PRINCIPAL PARA PRUEBAS ---
# Este bloque se usa para probar la clase HRAssistant directamente desde la terminal.
if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    # Carga las variables de entorno necesarias.
    ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")
    API_KEY = os.getenv("OPENAI_API_KEY")

    if not ASSISTANT_ID or not API_KEY:
        logger.error("CRÍTICO: Las variables de entorno OPENAI_ASSISTANT_ID y OPENAI_API_KEY deben estar definidas. Saliendo.")
        exit(1)

    # Inicializa el asistente.
    assistant = HRAssistant(assistant_id=ASSISTANT_ID, api_key=API_KEY)
    
    print("\n--- Asistente de RH Listo ---")
    
    question = "¿Qué beneficios tengo como trabajador bajo el contrato colectivo?"
    print(f"Pregunta del Usuario: {question}")
    print("Respuesta del Asistente (JSON en streaming):")
    
    # Crea un nuevo hilo para la prueba.
    thread_id = assistant.create_thread()
    
    # Obtiene el generador de respuestas y muestra la salida JSON cruda.
    response_generator = assistant.ask_question(question, thread_id=thread_id)
    for part_json in response_generator:
        print(part_json)
    
    print("\n--- Fin de la Respuesta ---")
