from datetime import datetime

from src.models.database import SessionLocal, Report


class ReportService:

    @staticmethod
    def save_report(filename, extraction):

        db = SessionLocal()

        report = Report(

            filename=filename,

            company_name=filename.replace(".pdf", ""),

            pages=extraction["total_pages"],

            extracted_text=extraction["full_text"],

            created_at=datetime.utcnow()

        )

        db.add(report)

        db.commit()

        db.refresh(report)

        db.close()

        return report

    @staticmethod
    def get_all_reports():

        db = SessionLocal()

        reports = db.query(Report).all()

        db.close()

        return reports

    @staticmethod
    def get_report(report_id):

        db = SessionLocal()

        report = db.query(Report).filter(
            Report.id == report_id
        ).first()

        db.close()

        return report