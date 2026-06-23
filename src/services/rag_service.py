from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

class RAGService:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        self.client = chromadb.Client(
            Settings(anonymized_telemetry=False)
        )

        try:

            self.collection = self.client.get_collection(
                "reports"
            )

        except:

            self.collection = self.client.create_collection(
                "reports"
            )