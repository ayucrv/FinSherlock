from sqlalchemy import (
    create_engine,
    Column,
    String,
    Integer,
    DateTime,
    Text,
    JSON
)
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# ==========================
# REPORT TABLE
# ==========================

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    filename = Column(String, nullable=False)

    company_name = Column(String)

    ticker = Column(String)

    pages = Column(Integer)

    extracted_text = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)


# ==========================
# ANALYSIS TABLE
# ==========================

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    report_id = Column(String)

    question = Column(Text)

    response = Column(Text)

    metadata_json = Column(JSON)

    created_at = Column(DateTime, default=datetime.utcnow)


# ==========================
# DATABASE HELPERS
# ==========================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)