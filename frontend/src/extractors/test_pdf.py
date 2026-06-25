from pdf_extractor import PDFExtractor

result = PDFExtractor.extract_text("samplepdf.pdf")

print("=" * 40)
print("Pages :", result["total_pages"])
print("Characters :", result["total_chars"])
print("=" * 40)

print(result["full_text"][:1000])