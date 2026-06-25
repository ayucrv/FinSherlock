from fastapi import FastAPI, UploadFile, File, HTTPException
from src.services.pdf_service import PDFService
from src.services.report_service import ReportService
from src.services.analysis_service import AnalysisService
from src.schemas.chat import ChatRequest
from src.rag.vector_store import VectorStore

app = FastAPI(
    title="FinSherlock API",
    version="1.0"
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analysis_service = AnalysisService()


@app.get("/")
def root():
    return {
        "message": "Welcome to FinSherlock 🕵️"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF."
        )

    extraction = await PDFService.process_upload(file)

    report = ReportService.save_report(
        file.filename,
        extraction
    )

    analysis = analysis_service.analyze(
        extraction["full_text"],
        "Give a concise financial investigation summary."
    )

    return {

        "report_id": report.id,

        "filename": report.filename,

        "company": report.company_name,

        "pages": report.pages,

        "summary": analysis["answer"],

        "metrics": analysis["metrics"],

        "risks": analysis["risks"]

    }


@app.get("/reports")
def get_reports():

    reports = ReportService.get_all_reports()

    return [

        {

            "id": report.id,

            "company": report.company_name,

            "filename": report.filename,

            "pages": report.pages,

            "created_at": report.created_at

        }

        for report in reports

    ]

@app.post("/chat")
def chat(request: ChatRequest):

    report = ReportService.get_report(
        request.report_id
    )

    if report is None:

        raise HTTPException(
            status_code=404,
            detail="Case not found."
        )

    chunks = VectorStore().search(

        report.id,

        request.question

    )

    context = "\n\n".join(chunks)

    analysis = analysis_service.analyze(

        context,

        request.question

    )

    return {

        "case": report.company_name,

        "question": request.question,

        "answer": analysis["answer"],

        "metrics": analysis["metrics"],

        "risks": analysis["risks"]

    }

@app.get("/report/{report_id}")
def get_report(report_id: str):

    report = ReportService.get_report(report_id)

    if report is None:

        raise HTTPException(
            status_code=404,
            detail="Case not found."
        )

    return {

        "id": report.id,

        "company": report.company_name,

        "filename": report.filename,

        "pages": report.pages,

        "text_preview": report.extracted_text[:1200],

        "created_at": report.created_at

    }