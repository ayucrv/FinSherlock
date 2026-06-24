import os
import tempfile

from src.extractors.pdf_extractor import PDFExtractor
from src.rag.chunker import TextChunker
from src.rag.vector_store import VectorStore
import uuid

class PDFService:

    @staticmethod
    async def process_upload(file):

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as tmp:

            content = await file.read()

            tmp.write(content)

            temp_path = tmp.name

        try:

            extraction = PDFExtractor.extract_text(temp_path)

            report_id = str(uuid.uuid4())

            chunker = TextChunker()

            chunks = chunker.split(
                extraction["full_text"]
            )

            VectorStore().add_document(
                report_id,
                chunks
            )

            extraction["report_id"] = report_id

            extraction["chunks"] = len(chunks)

            return extraction

        finally:

            if os.path.exists(temp_path):

                os.remove(temp_path)