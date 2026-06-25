import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer


class VectorStore:

    def __init__(self):

        self.client = chromadb.PersistentClient(path="./vector_db")

        self.collection = self.client.get_or_create_collection(
            name="financial_reports"
        )

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    def add_document(
        self,
        report_id,
        chunks
    ):

        embeddings = self.model.encode(chunks).tolist()

        ids = [
            f"{report_id}_{i}"
            for i in range(len(chunks))
        ]

        metadatas = [
            {
                "report_id": report_id,
                "chunk": i
            }
            for i in range(len(chunks))
        ]

        self.collection.add(

            ids=ids,

            documents=chunks,

            embeddings=embeddings,

            metadatas=metadatas

        )

    def search(
        self,
        report_id,
        question,
        k=5
    ):

        query_embedding = self.model.encode(question).tolist()

        results = self.collection.query(

            query_embeddings=[query_embedding],

            n_results=k,

            where={
                "report_id": report_id
            }

        )

        return results["documents"][0]