from fastapi import FastAPI, UploadFile, File, HTTPException
import tempfile
import os
from datetime import datetime

from src.extractors.pdf_extractor import PDFExtractor
from src.agent.financial_agent import FinancialAgent
from src.models.database import SessionLocal, Report

app = FastAPI(
    title="Financial AI Agent",
    version="1.0"
)

agent = FinancialAgent()


@app.get("/")
def root():
    return {
        "message": "Financial AI Agent Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Save uploaded PDF temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:

        content = await file.read()
        tmp.write(content)
        temp_path = tmp.name

    try:

        # Extract PDF text
        result = PDFExtractor.extract_text(temp_path)

        # AI Analysis
        analysis = agent.analyze(
            result["full_text"],
            "Summarize this financial report."
        )

        # Save report to database
        db = SessionLocal()

        report = Report(
            filename=file.filename,
            company_name=file.filename.replace(".pdf", ""),
            pages=result["total_pages"],
            extracted_text=result["full_text"],
            created_at=datetime.utcnow()
        )

        db.add(report)
        db.commit()
        db.refresh(report)

        db.close()

        return {

            "report_id": report.id,

            "filename": report.filename,

            "company": report.company_name,

            "pages": report.pages,

            "characters": result["total_chars"],

            "metrics": analysis["metrics"],

            "risks": analysis["risks"],

            "summary": analysis["answer"]

        }

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.get("/reports")
def get_reports():

    db = SessionLocal()

    reports = db.query(Report).all()

    data = []

    for report in reports:

        data.append({

            "id": report.id,

            "filename": report.filename,

            "company": report.company_name,

            "pages": report.pages,

            "created_at": report.created_at

        })

    db.close()

    return data