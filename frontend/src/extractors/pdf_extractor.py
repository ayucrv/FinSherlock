import pymupdf
import os


class PDFExtractor:
    """Extract text from PDF files."""

    @staticmethod
    def extract_text(pdf_path: str):

        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"{pdf_path} not found.")

        doc = pymupdf.open(pdf_path)

        full_text = ""

        for page in doc:
            full_text += page.get_text()

        result = {
            "full_text": full_text,
            "total_pages": doc.page_count,
            "total_chars": len(full_text)
        }

        doc.close()

        return result