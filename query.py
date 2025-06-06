import chromadb
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction
from openai import OpenAI
import os
from typing import Generator, Union, List, Dict # Added Dict for type hinting
from pathlib import Path # Import the Path object from pathlib import Path # Added for DB_DIR consistency
import logging # Added for logging

# --- Setup Logging ---
# Consistent logging setup with loader.py for easier debugging if needed
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(module)s - %(message)s')
logger = logging.getLogger(__name__)


class HRAssistant:
    def __init__(self, default_api_key: str = None): # Allow API key at init for convenience
        # Configuration
        # Ensure these match the values used in loader.py
        self.BASE_DIR = Path(__file__).resolve().parent # Consistent path definition
        self.DB_DIR = str(self.BASE_DIR / "chroma_db_hr_ocr") # MATCHES loader.py CHROMA_DB_DIR
        self.OPENAI_CHAT_MODEL = "gpt-4.1-mini-2025-04-14" # Chat model
        self.OPENAI_EMBEDDING_MODEL = "text-embedding-3-large" # MATCHES loader.py EMBEDDING_MODEL_NAME
        self.collection_name = "hr_documents_ocr_production_v1" # MATCHES loader.py COLLECTION_NAME

        # Initialize ChromaDB client (does not require API key for this step)
        # This assumes the DB directory and collection will be created/populated by loader.py
        self.client_chroma = chromadb.PersistentClient(path=self.DB_DIR)
        
        self._default_api_key = default_api_key # Store for convenience

        logger.info(f"HRAssistant initialized. ChromaDB path: {self.DB_DIR}, Collection: {self.collection_name}")
        logger.info(f"Expecting collection '{self.collection_name}' to be populated by loader.py.")


    def _get_openai_client(self, api_key: str) -> OpenAI:
        """Helper to get an OpenAI client instance."""
        if not api_key:
            raise ValueError("API key is required to initialize OpenAI client.")
        return OpenAI(api_key=api_key)

    def _get_embedding_function(self, api_key: str) -> OpenAIEmbeddingFunction:
        """Helper to get an OpenAIEmbeddingFunction instance."""
        if not api_key:
            raise ValueError("API key is required to initialize OpenAIEmbeddingFunction.")
        return OpenAIEmbeddingFunction(
            api_key=api_key,
            model_name=self.OPENAI_EMBEDDING_MODEL
        )

    def _get_chroma_collection(self, api_key: str) -> chromadb.Collection:
        """
        Helper to get the ChromaDB collection using the provided API key
        for the embedding function (needed for querying).
        """
        if not api_key:
            raise ValueError("API key is required to access ChromaDB collection with embeddings.")
        
        embedding_fn = self._get_embedding_function(api_key=api_key)
        
        # Get the collection. It's assumed loader.py created it.
        # If it doesn't exist, this will create an empty one, leading to "no documents found".
        try:
            collection = self.client_chroma.get_collection( # Use get_collection; loader handles creation
                name=self.collection_name,
                embedding_function=embedding_fn # Pass embedding function for query compatibility
            )
            logger.debug(f"Successfully retrieved collection: {self.collection_name}")
            return collection
        except Exception as e: # Catch if collection doesn't exist or other issues
            logger.error(f"Error getting collection '{self.collection_name}': {e}", exc_info=True)
            logger.error(f"Please ensure 'loader.py' has been run successfully to create and populate the collection.")
            # Raising an error might be better than returning None or an empty shell.
            raise ConnectionError(f"Could not access ChromaDB collection '{self.collection_name}'. "
                                  "Ensure it has been created and populated by the loader script.") from e


    def _build_prompt(self, question: str, context: str, conversation_history: List[Dict[str, str]], language: str) -> str:
        """Construct the prompt with context and conversation history."""
        history_prompt = ""
        if conversation_history: # Ensure conversation_history is not None
            history_prompt = "\n\nPrevious conversation:\n"
            for msg in conversation_history:
                role = "User" if msg.get('role') == 'user' else "Assistant" # Use .get for safety
                content = msg.get('content', '')
                history_prompt += f"{role}: {content}\n"

        # This is the prompt template from your original query.py
        return f"""Eres un asistente especializado en Recursos Humanos de HISENSE ELECTRÓNICA MÉXICO, S.A. DE C.V. 
        Tu función es responder preguntas basándote exclusivamente en la información contenida en los siguientes documentos:
        - Contrato Colectivo de Trabajo 2024.
        - Reglamento Interno de Trabajo (RIT) 2024.

        Instrucciones:
        1. Responde de manera clara, precisa y fundamentada en los documentos mencionados.
        2. Si la respuesta no se encuentra en los documentos, indica claramente que no hay información disponible.
        3. Siempre responde en el mismo idioma en que se formuló la pregunta (español o inglés).
        4. Evita suposiciones o información externa a los documentos proporcionados.
        5. En caso de preguntas sobre procedimientos, derechos u obligaciones, cita la cláusula o artículo correspondiente.
        6. Si la pregunta es sobre un documento específico, menciona el nombre del documento y la sección relevante.
        7. Mencionar en que parte del documento se encuentra la respuesta.
        8. Cuando pregunte de beneficios dime todos los que esten en el contrato colectivo 
        
        8. **Formato:** - Organiza la respuesta de manera clara. 
           - Usa listas cuando sea necesario para darle forma a las respuestas
           - Decirme al ultimo la fuente de la respuesta, SOLO con el nombre del documento doxc o pdf, NO MNENCIONAR LA SECCIÓN. NO MENCIONAR EL CAPITULO.  
           
        9. **Contexto:**
        Si me preguntan ¿Cuáles son las sanciones por llegar tarde, ausentarse o incumplir con mis deberes? contestar lo siguiente:
        Sanciones por llegar tarde (Retardos)
Primer retardo en 30 días: Amonestación verbal.
Segundo retardo en 30 días: Suspensión de 1 día sin goce de sueldo.
Tercer retardo en 30 días: Suspensión de 2 días sin goce de sueldo.
Cuarto retardo en 30 días: Suspensión de 3 días sin goce de sueldo.
Acumular 3 suspensiones por retardos en 6 meses: Suspensión de hasta 8 días sin goce de sueldo.
Más de 5 minutos de retardo: Se considera falta injustificada (Artículo 22).
Además, se reduce el bono de puntualidad proporcionalmente a los retardos incurridos durante la semana (Artículo 79).

Sanciones por ausentarse (Faltas injustificadas)
Primera falta en 30 días: Amonestación por escrito.
Segunda falta en 30 días: Suspensión de hasta 4 días sin goce de sueldo.
Tercera falta en 30 días: Suspensión de hasta 8 días sin goce de sueldo.
Cuarta falta en 30 días: Terminación de la relación laboral sin responsabilidad para la empresa (Artículo 47, Fracción X de la LFT).
Faltar un día antes o después de días de descanso/vacaciones: Suspensión de hasta 5 días sin goce de sueldo (Artículo 80).
El trabajador pierde la parte proporcional del bono de asistencia por cada falta (Artículo 80).

Sanciones por incumplir con los deberes
Las sanciones varían según la gravedad de la falta:
Faltas leves:
Amonestación verbal (primera vez).
Amonestación por escrito (segunda vez).
Suspensión de 1 día (tercera vez).
Suspensión de 2 días (cuarta vez).
Suspensión de 3 a 8 días (quinta vez en adelante).
Faltas graves:
Suspensión de hasta 8 días sin goce de sueldo desde la primera ocasión (Artículo 70).
Causas de rescisión (sin responsabilidad para la empresa):
Negligencia grave, daños a equipos, robo, acoso, violencia laboral, revelar secretos industriales, entre otras (Artículo 83).

Procedimiento para justificar faltas
Para evitar que una ausencia sea considerada injustificada, el trabajador debe:
En caso de permiso: Obtener autorización por escrito del supervisor.
En caso de enfermedad/accidente: Presentar incapacidad del IMSS el mismo día de su expedición (Artículo 72).

Nota importante
Las sanciones se aplican considerando la gravedad de la falta y el historial del trabajador. El trabajador tiene derecho a ser escuchado en su defensa antes de cualquier sanción (Artículo 77).

Fuente: Capítulos XII y XIII del Reglamento Interno de Trabajo 2024.

Si pregunto ¿Qué hago si creo que mi jefe está incumpliendo el contrato colectivo? anadir tambien el nombre de la persona.

Si pregunto: Cuantos dias de aguinaldo me corresponden? Contestar lo siguiente: 
El aguinaldo que te corresponde según el Contrato Colectivo de Trabajo 2024 es:
Un aguinaldo anual equivalente a 16 días de salario.
Este pago debe realizarse antes del día 20 de diciembre de cada año.
Para quienes no hayan cumplido un año completo de servicio, el aguinaldo se paga proporcionalmente al tiempo trabajado.
Fuente: Contrato Colectivo de Trabajo 2024, cláusula Décima Sexta

Si pregunto: Como funciona el bono de antiguedad? contestar lo siguiente:
El bono de antigüedad en HISENSE ELECTRÓNICA MÉXICO, S.A. DE C.V. funciona de la siguiente manera, según el Contrato Colectivo de Trabajo 2024:

A los trabajadores que superen 3 meses de antigüedad se les otorga un bono único de $50.00 pesos.
A los que superen 6 meses de antigüedad, un bono único de $70.00 pesos.
A los que superen 9 meses de antigüedad, un bono único de $90.00 pesos.
A los que superen 12 meses de antigüedad, un bono único de $100.00 pesos.
A los que superen 24 meses de antigüedad, un bono único de $120.00 pesos.
A los que superen 36 meses de antigüedad, un bono único de $140.00 pesos.
A los que superen del cuarto al octavo año de antigüedad, un bono único anual de $160.00 pesos.
Este bono se paga de manera proporcional conforme a la antigüedad del trabajador.

Fuente: Contrato Colectivo de Trabajo 2024, cláusula trigésima novena
{context}
{history_prompt}

Question:
{question}

Answer in {language}:
"""

    def _get_context_from_db(self, question: str, api_key: str, top_k: int = 3) -> Union[str, None]:
        """Retrieve relevant context from ChromaDB using the provided API key for embeddings."""
        if not api_key:
            # This should ideally be caught before calling this method by ask_question.
            raise ValueError("API key is required to get context from ChromaDB.")
        
        try:
            collection = self._get_chroma_collection(api_key=api_key) # API key needed for embedding function
            logger.debug(f"Querying collection '{self.collection_name}' for: '{question}' (top_k={top_k})")
            results = collection.query(query_texts=[question], n_results=top_k)
            
            if not results or not results["documents"] or not results["documents"][0]:
                logger.warning(f"No documents found in ChromaDB for the query: '{question}'")
                return None
            
            # Limit context size (approx 6000 chars as in original)
            context_str = "\n\n".join(results["documents"][0])
            logger.debug(f"Retrieved {len(results['documents'][0])} document chunks. Total context char length: {len(context_str)}. Preview: '{context_str[:200]}...'")
            return context_str[:6000] 
        except ConnectionError: # Propagate error from _get_chroma_collection
            raise
        except Exception as e:
            logger.error(f"Error querying ChromaDB: {e}", exc_info=True)
            return None


    def ask_question(
        self,
        question: str,
        language: str = 'english', # Default from your original file
        conversation_history: List[Dict[str, str]] = None, # Type hint for clarity
        top_k: int = 3,
        api_key: str = None
    ) -> Union[str, Generator[str, None, None]]:
        """
        Ask a question and get a streaming response using the provided API key.
        """
        if conversation_history is None:
            conversation_history = []

        current_api_key = api_key or self._default_api_key
        if not current_api_key:
            err_msg_en = "⚠️ API key not provided. Please provide an API key to the 'ask_question' method or during HRAssistant initialization."
            err_msg_es = "⚠️ Clave API no proporcionada. Por favor, proporcione una clave API al método 'ask_question' o durante la inicialización de HRAssistant."
            return err_msg_en if language == 'english' else err_msg_es

        try:
            # Initialize OpenAI client for this specific call using the provided API key
            current_openai_client = self._get_openai_client(api_key=current_api_key)
            
            # Get context from ChromaDB (this also uses the api_key for embeddings)
            context = self._get_context_from_db(question, api_key=current_api_key, top_k=top_k)
            
            if not context:
                # Check if the collection exists and is empty
                try:
                    collection = self._get_chroma_collection(api_key=current_api_key)
                    if collection.count() == 0:
                        logger.warning("No context found, and the ChromaDB collection is empty. Ensure 'loader.py' has run and populated documents.")
                        empty_msg_en = " The knowledge base appears to be empty. Please run the loader script to add documents."
                        empty_msg_es = " La base de conocimientos parece estar vacía. Por favor, ejecute el script cargador para agregar documentos."
                        return ("⚠️ No relevant documents found." if language == 'english' else "⚠️ No se encontraron documentos relevantes.") + \
                               (empty_msg_en if language == 'english' else empty_msg_es)
                except ConnectionError as ce: # If collection cannot be accessed
                     logger.error(f"Could not check collection status: {ce}")
                     return f"⚠️ Error accessing the knowledge base: {ce}" if language == 'english' else f"⚠️ Error al acceder a la base de conocimientos: {ce}"
                except Exception as e: # Other errors checking count
                    logger.error(f"An error occurred while checking collection count: {e}")
                
                return "⚠️ No relevant documents found for your query." if language == 'english' else "⚠️ No se encontraron documentos relevantes para su consulta."


            # Build the user prompt
            user_prompt_content = self._build_prompt(question, context, conversation_history, language)

            # System prompt (from your original query.py, with the instruction 8 variation)
            system_prompt_content = (
"""Eres un asistente especializado en Recursos Humanos de HISENSE ELECTRÓNICA MÉXICO, S.A. DE C.V. 
        Tu función es responder preguntas basándote exclusivamente en la información contenida en los siguientes documentos:
        - Contrato Colectivo de Trabajo 2024.
        - Reglamento Interno de Trabajo (RIT) 2024.

        Instrucciones:
        1. Responde de manera clara, precisa y fundamentada en los documentos mencionados.
        2. Si la respuesta no se encuentra en los documentos, indica claramente que no hay información disponible.
        3. Siempre responde en el mismo idioma en que se formuló la pregunta (español o inglés).
        4. Evita suposiciones o información externa a los documentos proporcionados.
        5. En caso de preguntas sobre procedimientos, derechos u obligaciones, cita la cláusula o artículo correspondiente.
        6. Si la pregunta es sobre un documento específico, menciona el nombre del documento y la sección relevante.
        7. Mencionar en que parte del documento se encuentra la respuesta.
        8. Cuando pregunte de beneficios dime todos los que esten en el contrato colectivo 
        
        8. **Formato:** - Organiza la respuesta de manera clara. 
           - Usa listas cuando sea necesario para darle forma a las respuestas
           - Decirme al ultimo la fuente de la respuesta, con el nombre del documento doxc o pdf y la sección relevante. 
           
        9. **Contexto:**
        Si me preguntan ¿Cuáles son las sanciones por llegar tarde, ausentarse o incumplir con mis deberes? contestar lo siguiente:
        Sanciones por llegar tarde (Retardos)
Primer retardo en 30 días: Amonestación verbal.
Segundo retardo en 30 días: Suspensión de 1 día sin goce de sueldo.
Tercer retardo en 30 días: Suspensión de 2 días sin goce de sueldo.
Cuarto retardo en 30 días: Suspensión de 3 días sin goce de sueldo.
Acumular 3 suspensiones por retardos en 6 meses: Suspensión de hasta 8 días sin goce de sueldo.
Más de 5 minutos de retardo: Se considera falta injustificada (Artículo 22).
Además, se reduce el bono de puntualidad proporcionalmente a los retardos incurridos durante la semana (Artículo 79).

Sanciones por ausentarse (Faltas injustificadas)
Primera falta en 30 días: Amonestación por escrito.
Segunda falta en 30 días: Suspensión de hasta 4 días sin goce de sueldo.
Tercera falta en 30 días: Suspensión de hasta 8 días sin goce de sueldo.
Cuarta falta en 30 días: Terminación de la relación laboral sin responsabilidad para la empresa (Artículo 47, Fracción X de la LFT).
Faltar un día antes o después de días de descanso/vacaciones: Suspensión de hasta 5 días sin goce de sueldo (Artículo 80).
El trabajador pierde la parte proporcional del bono de asistencia por cada falta (Artículo 80).

Sanciones por incumplir con los deberes
Las sanciones varían según la gravedad de la falta:
Faltas leves:
Amonestación verbal (primera vez).
Amonestación por escrito (segunda vez).
Suspensión de 1 día (tercera vez).
Suspensión de 2 días (cuarta vez).
Suspensión de 3 a 8 días (quinta vez en adelante).
Faltas graves:
Suspensión de hasta 8 días sin goce de sueldo desde la primera ocasión (Artículo 70).
Causas de rescisión (sin responsabilidad para la empresa):
Negligencia grave, daños a equipos, robo, acoso, violencia laboral, revelar secretos industriales, entre otras (Artículo 83).

Procedimiento para justificar faltas
Para evitar que una ausencia sea considerada injustificada, el trabajador debe:
En caso de permiso: Obtener autorización por escrito del supervisor.
En caso de enfermedad/accidente: Presentar incapacidad del IMSS el mismo día de su expedición (Artículo 72).

Nota importante
Las sanciones se aplican considerando la gravedad de la falta y el historial del trabajador. El trabajador tiene derecho a ser escuchado en su defensa antes de cualquier sanción (Artículo 77).

Fuente: Capítulos XII y XIII del Reglamento Interno de Trabajo 2024.

Si pregunto ¿Qué hago si creo que mi jefe está incumpliendo el contrato colectivo? anadir tambien el nombre de la persona."""
            )
            
            logger.debug(f"System Prompt (start): {system_prompt_content[:200]}...")
            logger.debug(f"User Prompt (start): {user_prompt_content[:200]}...")

            # Create streaming response
            response_stream = current_openai_client.chat.completions.create(
                model=self.OPENAI_CHAT_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt_content},
                    {"role": "user", "content": user_prompt_content}
                ],
                temperature=0.3, # As per your original file
                max_tokens=2000, # As per your original file
                stream=True
            )

            return self._stream_response(response_stream)
        
        except ValueError as ve: # Catch API key or configuration errors from helper methods
            error_message = f"Configuration Error: {str(ve)}" if language == 'english' else f"Error de Configuración: {str(ve)}"
            logger.error(f"ValueError in ask_question: {ve}", exc_info=True)
            return error_message
        except ConnectionError as ce: # Catch DB connection issues from _get_context_from_db
            logger.error(f"Database connection error: {ce}", exc_info=True)
            return f"⚠️ Database Error: {ce}" if language == 'english' else f"⚠️ Error de Base de Datos: {ce}"
        except Exception as e:
            logger.error(f"Unexpected exception in ask_question: {e}", exc_info=True)
            error_message = f"❌ Error generating response: {str(e)}" if language == 'english' else f"❌ Error al generar respuesta: {str(e)}"
            return error_message

    def _stream_response(self, response_stream: Generator) -> Generator[str, None, None]:
        """Yield tokens from the OpenAI stream."""
        for chunk in response_stream:
            if chunk.choices and chunk.choices[0].delta and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

# --- Main Execution Block (Example Usage) ---
if __name__ == "__main__":
    logger.info("Starting HR Assistant Query script.")

    # Attempt to load API key from environment for the script execution
    # For actual deployment, manage API keys securely.
    from dotenv import load_dotenv # Optional: if you use a .env file
    load_dotenv() 
    
    OPENAI_API_KEY_FROM_ENV = os.getenv("OPENAI_API_KEY")

    if not OPENAI_API_KEY_FROM_ENV:
        logger.error("CRITICAL: OPENAI_API_KEY environment variable not set. This is required for querying. Exiting.")
        print("Please set the OPENAI_API_KEY environment variable to run this example.")
        print("Example for bash/zsh: export OPENAI_API_KEY='your_key_here'")
        print("Example for PowerShell: $env:OPENAI_API_KEY='your_key_here'")
        exit(1)

    # Initialize Assistant (can pass API key here, or to each ask_question call)
    assistant = HRAssistant(default_api_key=OPENAI_API_KEY_FROM_ENV)
    
    logger.info("\n--- HR Assistant Ready to Answer Questions ---")
    logger.info("Ensure 'loader.py' has been run to populate the knowledge base.")

    # --- Example Questions ---
    
    # Example 1: General question in Spanish (assuming documents might contain benefit info)
    question1_es = "¿Cuáles son mis beneficios laborales según el Contrato Colectivo?"
    print(f"\nUser Query (español): {question1_es}")
    print("Assistant Response (streaming):")
    
    response_gen1 = assistant.ask_question(question1_es, language='español') # API key from init
    if isinstance(response_gen1, str): # Indicates an error message was returned
        print(response_gen1)
    else:
        for chunk_content in response_gen1:
            print(chunk_content, end="", flush=True)
        print("\n------------------------------------")

    # Example 2: Question that might trigger a canned response (Spanish)
    question2_es = "¿Cuáles son las sanciones por llegar tarde?"
    print(f"\nUser Query (español): {question2_es}")
    print("Assistant Response (streaming):")
    response_gen2 = assistant.ask_question(question2_es, language='español')
    if isinstance(response_gen2, str):
        print(response_gen2)
    else:
        for chunk_content in response_gen2:
            print(chunk_content, end="", flush=True)
        print("\n------------------------------------")

    # Example 3: English question (assuming documents might contain vacation policy)
    question3_en = "What is the company's vacation policy?"
    print(f"\nUser Query (english): {question3_en}")
    print("Assistant Response (streaming):")
    response_gen3 = assistant.ask_question(question3_en, language='english')
    if isinstance(response_gen3, str):
        print(response_gen3)
    else:
        for chunk_content in response_gen3:
            print(chunk_content, end="", flush=True)
        print("\n------------------------------------")
    
    # Example 4: Question where context might not exist
    question4_es = "¿Cuál es el menú de la cafetería para la próxima semana?"
    print(f"\nUser Query (español): {question4_es}")
    print("Assistant Response (streaming):")
    response_gen4 = assistant.ask_question(question4_es, language='español')
    if isinstance(response_gen4, str):
        print(response_gen4)
    else:
        for chunk_content in response_gen4:
            print(chunk_content, end="", flush=True)
        print("\n------------------------------------")
        
    # Example 5: Conversation history
    # The HRAssistant class itself does not maintain conversation state between calls.
    # The calling application needs to manage and pass the history.
    # conversation_history_example = [
    #     {'role': 'user', 'content': 'What are the main company holidays observed?'},
    #     {'role': 'assistant', 'content': 'Based on the documents, the main company holidays include New Year Day, Revolution Day, and Christmas Day.'}
    # ]
    # question5_en = "Is Independence Day also a holiday?"
    # print(f"\nUser Query (english) with history: {question5_en}")
    # print("Assistant Response (streaming):")
    # response_gen5 = assistant.ask_question(
    #     question5_en,
    #     language='english',
    #     conversation_history=conversation_history_example
    # )
    # if isinstance(response_gen5, str):
    #     print(response_gen5)
    # else:
    #     for chunk_content in response_gen5:
    #         print(chunk_content, end="", flush=True)
    #     print("\n------------------------------------")

    logger.info("HR Assistant example script finished.")