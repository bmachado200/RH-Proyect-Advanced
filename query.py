import os
import time
from openai import OpenAI, Timeout
from typing import Generator, Union, List, Dict
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(module)s - %(message)s')
logger = logging.getLogger(__name__)

class HRAssistant:
    def __init__(self, assistant_id: str, api_key: str):
        if not assistant_id:
            raise ValueError("An Assistant ID is required for initialization.")
        if not api_key:
            raise ValueError("An OpenAI API key is required for initialization.")
            
        self.assistant_id = assistant_id
        self.client = OpenAI(api_key=api_key, timeout=Timeout(30.0, connect=5.0))
        logger.info(f"HRAssistant initialized for assistant_id: {self.assistant_id}")

    def create_thread(self) -> str:
        """
        Creates a new conversation thread.
        Returns:
            The ID of the new thread.
        """
        try:
            thread = self.client.beta.threads.create()
            logger.info(f"Created new thread with ID: {thread.id}")
            return thread.id
        except Exception as e:
            logger.error(f"Could not create thread: {e}", exc_info=True)
            raise

    def ask_question(
        self,
        question: str,
        thread_id: str
    ) -> Generator[str, None, None]:
        """
        Asks a question within a specific thread and streams the response.
        Yields:
            A token of the response string.
        """
        if not thread_id:
            raise ValueError("A thread_id is required to ask a question.")

        try:
            self.client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content=question
            )
            logger.debug(f"Added message to thread {thread_id}: '{question}'")

            with self.client.beta.threads.runs.stream(
                thread_id=thread_id,
                assistant_id=self.assistant_id,
            ) as stream:
                for event in stream:
                    if event.event == 'thread.message.delta':
                        if event.data.delta.content:
                            token = event.data.delta.content[0].text.value
                            yield token
            
            logger.info(f"Finished streaming response for thread {thread_id}")

        except Exception as e:
            logger.error(f"An unexpected error occurred in ask_question: {e}", exc_info=True)
            yield f"❌ An error occurred while communicating with the Assistant: {str(e)}"

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")
    API_KEY = os.getenv("OPENAI_API_KEY") # You need a key to run this test

    if not ASSISTANT_ID or not API_KEY:
        logger.error("CRITICAL: OPENAI_ASSISTANT_ID and OPENAI_API_KEY environment variables must be set. Exiting.")
        exit(1)

    # Initialize the assistant
    assistant = HRAssistant(assistant_id=ASSISTANT_ID, api_key=API_KEY)
    
    print("\n--- HR Assistant Ready ---")
    
    question = "¿Qué beneficios tengo como trabajador bajo el contrato colectivo?"
    print(f"User Query: {question}")
    print("Assistant Response (streaming):")
    
    thread_id = None
    full_response = ""

    response_generator = assistant.ask_question(question)
    for part in response_generator:
        if part['type'] == 'thread_id':
            thread_id = part['value']
            print(f"[System: Acquired Thread ID: {thread_id}]")
        elif part['type'] == 'token':
            print(part['value'], end="", flush=True)
            full_response += part['value']
    
    print("\n--- End of Response ---")