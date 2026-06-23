import os
import tempfile

from src.extractors.pdf_extractor import PDFExtractor


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

            result = PDFExtractor.extract_text(temp_path)

        finally:

            if os.path.exists(temp_path):
                os.remove(temp_path)

        return result