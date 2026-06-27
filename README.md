FinSherlock
AI-powered forensic analysis of financial statements. Detect accounting irregularities, revenue manipulation signals, and hidden risks in SEC filings with conversational AI.
Show Image Show Image Show Image Show Image
Live Demo 

Table of Contents
Overview
Key Features
Architecture
System Design
RAG Pipeline
Frontend Architecture
Backend Architecture
Technology Stack
Installation
Prerequisites
Backend Setup
Frontend Setup
Environment Configuration
Usage
API Documentation
Quick Start
Analysis Workflow
Project Structure
Development
Running Locally
Debugging
Contributing
License

Overview
FinSherlock is an intelligent financial analysis platform that combines vector-based semantic search (RAG) with large language models to perform forensic analysis of financial documents. The system ingests PDF reports (10-K, 10-Q, 8-K filings, annual reports), chunks them intelligently, generates semantic embeddings, and enables conversational analysis through an AI detective character named Sherry.
Key Innovation: Rather than simple keyword search, FinSherlock uses Retrieval-Augmented Generation (RAG) to understand financial concepts semantically—enabling detection of:
Accounting pattern shifts and anomalies
Revenue recognition inconsistencies
Cash flow mismatches with earnings claims
Unusual related-party transactions
Aggressive financial forecasting
Off-balance-sheet arrangements
Use Cases:
Due diligence for investors and fund managers
Fraud detection and forensic accounting
Compliance and regulatory analysis
Internal financial audit support
Credit risk assessment for lenders

Key Features
Feature
Description
🔍 Semantic Search
RAG-powered analysis that understands financial context beyond keyword matching
🤖 Conversational AI
Chat with Sherry, an AI partner that explains findings in plain language
📄 Multi-Format Support
Ingests 10-K, 10-Q, 8-K, annual reports, proxy statements (PDF)
⚠️ Risk Scoring
Dynamic risk assessment with evidence-based severity ratings
📊 Evidence Tracking
Organized evidence board with document references and cross-references
🕰️ Investigation Timeline
Chronological log of all findings and analysis steps
⚡ Real-Time Analysis
Stream-based responses with typing indicators and reasoning transparency
📁 Case Management
Persistent storage of investigations with version tracking


Architecture
System Design
┌─────────────────────────────────────────────────────────────────────┐
│                        FinSherlock Platform                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────┐              ┌──────────────────────┐   │
│  │   Frontend (Next.js) │              │  Backend (FastAPI)   │   │
│  │  ├─ Landing Page     │◄────HTTP────►├─ PDF Ingestion      │   │
│  │  ├─ Dashboard        │   WebSocket   ├─ RAG Pipeline       │   │
│  │  ├─ Chat Interface   │              ├─ Analysis Engine     │   │
│  │  └─ Evidence Board   │              └─ Persistence Layer   │   │
│  └──────────────────────┘              └──────────────────────┘   │
│                                                   │                 │
│                                                   ▼                 │
│                                     ┌──────────────────────────┐   │
│                                     │   Vector + Data Layer    │   │
│                                     ├──────────────────────────┤   │
│                                     │ ├─ ChromaDB Vector Store│   │
│                                     │ ├─ SQLite Report DB      │   │
│                                     │ └─ File Storage          │   │
│                                     └──────────────────────────┘   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              External Services                                │ │
│  │  ├─ Groq API (LLM Inference)                                 │ │
│  │  └─ Hugging Face (Embedding Model)                           │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
RAG Pipeline
The heart of FinSherlock is a sophisticated Retrieval-Augmented Generation pipeline:
1. Document Ingestion & Processing
PDF Upload → PyMuPDF Extraction → Text Normalization → Chunking
Text Chunking Strategy:
Algorithm: RecursiveCharacterTextSplitter (LangChain)
Chunk Size: 1,000 tokens
Overlap: 200 tokens (preserves context across boundaries)
Separators: ["\n\n", "\n", ".", " ", ""] (hierarchical fallback)
Purpose: Balance semantic completeness with retrieval granularity
2. Embedding & Vector Storage
Chunks → Sentence-Transformers (all-MiniLM-L6-v2) → Vector Embeddings
                                                            ↓
                                               ChromaDB Persistent Store
                                              (Semantic + Metadata Index)
Embedding Model: sentence-transformers/all-MiniLM-L6-v2
Lightweight (22M parameters) → fast inference on CPU
Strong semantic understanding for financial domain
384-dimensional vectors
Optimized for semantic similarity search
Vector Store (ChromaDB):
Persistent local storage with JSON persistence
Collection per financial analysis session
Metadata indexing by report_id and chunk position
Enables fast k-nearest-neighbor (k=5-10) retrieval
3. Query Processing & Retrieval
User Question → Embedding → Semantic Search → Top-K Retrieval
                              (ChromaDB)
                                 ↓
                        Retrieved Contexts (Documents)
Search Flow:
User asks question via chat
Question encoded to 384-dim vector
Cosine similarity search against document embeddings
Top 5-10 most relevant chunks returned
Metadata preserved (report_id, chunk index) for provenance
4. Context Augmentation & LLM Inference
Retrieved Context + User Question + System Prompt → Groq LLM → Response
Prompt Architecture:
System role: "Financial forensic analyst with expertise in SEC filing analysis"
Context: Injected retrieved chunks with source references
User query: Natural language question
Reasoning: Chain-of-thought prompting for complex analyses
Output: Structured finding with risk severity, evidence, and page reference
5. Response Post-Processing & Storage
LLM Output → Parse (Finding + Evidence) → Store in SQLAlchemy DB
                                              ↓
                                         Persist Investigation
                                         (Case ID + Timeline)
Key RAG Advantages:
Accuracy: Ground truth from actual document text (reduces hallucination)
Provenance: Every finding linked to source document + page
Efficiency: Only relevant context passed to LLM (lower latency + cost)
Scalability: Add new documents without retraining embeddings
Transparency: Users see which document chunks informed each finding

Frontend Architecture
Framework: Next.js 14 (App Router)
 Styling: TailwindCSS + Custom Design Tokens
 Animation: Framer Motion + Custom Hooks
 State: React Hooks (no external state manager needed for MVP)
Page Structure
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Landing page
├── dashboard/
│   ├── layout.tsx             # Dashboard grid layout
│   ├── page.tsx               # Investigation workspace
│   └── case/[id]/page.tsx     # Individual case view
└── api/
    └── route.ts               # Backend proxy routes (optional)
Component Architecture
components/
├── ui/                        # Atomic design primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── GlassPanel.tsx        # Custom glassmorphism component
│   ├── GlowingText.tsx
│   └── ...
├── Landing/                   # Landing page sections
│   ├── Hero.tsx              # Hero with parallax + particles
│   ├── Features.tsx          # Feature cards with animations
│   ├── HowItWorks.tsx        # Step-by-step visual flow
│   ├── CaseFiles.tsx         # Carousel of past cases
│   └── FAQ.tsx               # Accordion component
├── Dashboard/                 # Investigation workspace
│   ├── Sidebar.tsx           # Evidence board + case files
│   ├── Workspace.tsx         # PDF preview + risk gauge
│   ├── ChatPanel.tsx         # Conversation with Sherry
│   ├── Terminal.tsx          # System log console
│   └── RiskMeter.tsx         # Animated SVG gauge
├── Sherry/                    # AI Character
│   ├── SherryAvatar.tsx      # Pixel-art character states
│   ├── SpeechBubble.tsx
│   └── ThinkingIndicator.tsx
└── ...
Key Animation Hooks
useScrollReveal() — Trigger animations on scroll
useParallax() — Mouse-driven 3D parallax
useMagneticButton() — Cursor-tracking button interactions
useTypewriter() — Typewriter effect for AI responses
useSpringTransition() — Spring-physics element transitions
Design System
Typography:
Headings: Cinzel (serif, elegant)
Body: Inter (sans-serif, readable)
Data/Code: JetBrains Mono (monospace)
Color Palette:
Background: #0a0e27 (midnight blue)
Accent: #d4af37 (warm gold)
Secondary: #1b5e4d (dark emerald)
Danger: #c41e3a (red flag)
Effects:
CRT scanlines overlay (retro aesthetic)
Noise overlay (analog film grain)
Glassmorphism (frosted glass panels)
Glow shadows (cyberpunk neon)
Particle systems (background atmosphere)

Backend Architecture
Framework: FastAPI (async, fast)
 Server: Uvicorn (ASGI)
 Database: SQLite + SQLAlchemy ORM
 Vector Store: ChromaDB (persistent)
API Routes
POST   /api/v1/reports/upload         # Ingest PDF, return report_id
GET    /api/v1/reports/{id}           # Fetch report metadata
POST   /api/v1/analysis/query          # Submit question, get streaming response
GET    /api/v1/analysis/{case_id}     # Get investigation case details
GET    /api/v1/evidence/{case_id}     # Fetch all evidence for case
GET    /api/v1/timeline/{case_id}     # Get chronological findings
DELETE /api/v1/reports/{id}           # Delete report + vector embeddings
Service Layer
PDFService — Extract text from uploaded PDFs
python
class PDFService:
    - extract_text(pdf_bytes) → str
    - extract_metadata(pdf_path) → dict
    - validate_format() → bool
ChunkerService — Split text into semantic chunks
python
class TextChunker:
    - split(text: str) → List[str]
    - chunk_size: 1000
    - overlap: 200
VectorStore — Manage embeddings and semantic search
python
class VectorStore:
    - add_document(report_id, chunks) → None
    - search(report_id, question, k=5) → List[str]
AnalysisService — Orchestrate RAG + LLM inference
python
class AnalysisService:
    - analyze(report_id, question) → AsyncGenerator[str]
    - extract_findings(response) → Finding[]
    - compute_risk_score(findings) → float
ReportRepository — Persist investigations
python
class ReportRepository:
    - create_report(pdf_bytes) → Report
    - create_investigation(report_id, question) → Investigation
    - fetch_evidence(case_id) → Evidence[]
Database Schema
python
# SQLAlchemy Models

class Report(Base):
    __tablename__ = "reports"
    id: UUID
    filename: str
    file_type: str
    uploaded_at: datetime
    chunks_count: int
    embedding_count: int
    metadata: JSON

class Investigation(Base):
    __tablename__ = "investigations"
    id: UUID
    report_id: UUID (FK)
    question: str
    response: str
    findings: List[Finding]
    risk_score: float
    created_at: datetime

class Finding(Base):
    __tablename__ = "findings"
    id: UUID
    investigation_id: UUID (FK)
    severity: Enum["HIGH", "MEDIUM", "LOW"]
    category: str  # e.g., "revenue_recognition", "cash_flow_anomaly"
    description: str
    evidence_chunks: List[str]
    page_reference: str
    confidence: float
Groq Integration
Model: mixtral-8x7b-32768 or llama-2-70b-chat
API Mode: Streaming for real-time UI updates
Context Window: 32K tokens (sufficient for multi-chunk analysis)
Rate Limits: Groq Free tier 30k/min tokens

Technology Stack
Frontend
Layer
Technologies
Framework
Next.js 14, React 18, TypeScript
Styling
TailwindCSS, PostCSS
Animation
Framer Motion, React Spring
UI Components
Lucide React, custom primitives
State
React Hooks, Context API
HTTP Client
Fetch API, optional Axios
Build Tool
Webpack (Next.js default)

Backend
Layer
Technologies
Framework
FastAPI, Uvicorn
Language
Python 3.10+
Database
SQLite, SQLAlchemy ORM
Vector DB
ChromaDB (persistent JSON)
Embeddings
Sentence Transformers (all-MiniLM-L6-v2)
LLM
Groq API (inference)
Text Processing
PyMuPDF (PDF), LangChain (chunking)
Validation
Pydantic
Task Queue
Optional (Celery if async processing needed)

DevOps & Deployment
Service
Purpose
Vercel
Frontend hosting (serverless)
Hugging Face Spaces
Backend hosting (Docker, CPU-optimized)
GitHub
Version control & CI/CD


Installation
Prerequisites
Python 3.10+ — Backend runtime
Node.js 18+ — Frontend build tooling
npm or yarn — Package management
Git — Version control
Groq API Key — Get free key
Backend Setup
1. Clone and navigate
bash
git clone https://github.com/yourusername/finsherlock.git
cd finsherlock/backend
2. Create Python virtual environment
bash
python -m venv venv
source venv/bin/activate          # macOS/Linux
# or
venv\Scripts\activate              # Windows
3. Install dependencies
bash
pip install -r requirements.txt
requirements.txt contents:
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
chromadb>=0.4.0
python-dotenv>=1.0.0
langchain>=0.1.0
langchain-community>=0.0.1
langchain-groq>=0.1.0
pymupdf>=1.23.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
python-multipart>=0.0.6
requests>=2.31.0
beautifulsoup4>=4.12.0
httpx>=0.25.0
pandas>=2.0.0
numpy>=1.24.0
sentence-transformers>=2.2.0
yfinance>=0.2.0
4. Set environment variables
bash
cp .env.example .env.local
# Edit .env.local with your credentials
Required environment variables:
env
GROQ_API_KEY=your-groq-api-key-here
DATABASE_URL=sqlite:///./app.db
VECTOR_DB_PATH=./vector_db
LOG_LEVEL=INFO
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
5. Run backend server
bash
uvicorn src.api.main:app --reload --port 8000
Backend will be available at http://localhost:8000
 Swagger UI: http://localhost:8000/docs
Frontend Setup
1. Navigate to frontend directory
bash
cd finsherlock/frontend
2. Install dependencies
bash
npm install
3. Set environment variables
bash
cp .env.example .env.local
Required environment variables:
env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=FinSherlock
NODE_ENV=development
4. Run development server
bash
npm run dev
Frontend will be available at http://localhost:3000
5. Build for production
bash
npm run build
npm run start
Environment Configuration
Complete .env.example template:
Backend (backend/.env.example):
env
# LLM Configuration
GROQ_API_KEY=gsk_your_key_here
GROQ_MODEL=mixtral-8x7b-32768

# Database
DATABASE_URL=sqlite:///./app.db
VECTOR_DB_PATH=./vector_db

# Embedding Model
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Server
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO
WORKERS=4

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# File Upload
MAX_FILE_SIZE=50000000
TEMP_UPLOAD_DIR=./temp_uploads
Frontend (frontend/.env.example):
env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=FinSherlock
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NODE_ENV=development

Usage
API Documentation
Interactive API docs available at: http://localhost:8000/docs (Swagger UI)
Quick Start
1. Upload a Financial Report
bash
curl -X POST http://localhost:8000/api/v1/reports/upload \
  -F "file=@10-K_2023.pdf" \
  -H "Accept: application/json"
Response:
json
{
  "id": "report_uuid",
  "filename": "10-K_2023.pdf",
  "chunks_count": 45,
  "embedding_count": 45,
  "status": "ready"
}
2. Ask a Question About the Report
bash
curl -X POST http://localhost:8000/api/v1/analysis/query \
  -H "Content-Type: application/json" \
  -d '{
    "report_id": "report_uuid",
    "question": "What are the key revenue recognition policies and any changes from prior year?"
  }'
Response (streaming):
Analyzing revenue policies from MD&A and Note 2...

**Finding:** Revenue Recognition Policy Changed in 2023
Severity: MEDIUM
Evidence: Page 15 (Item 1.A Risk Factors), Page 34 (Note 2 – Accounting Policies)

The company modified its performance obligation recognition timeline for subscription services from up-front to over the contract term, consistent with ASC 606 but representing a material shift...
3. Access Investigation Results
Analysis Workflow
Step 1: Document Upload
User uploads PDF → Backend extracts text → Text split into chunks
                                           ↓
                          Embeddings generated (Sentence-Transformers)
                          Stored in ChromaDB with metadata
Step 2: Question Submission
User types question in chat → Frontend sends to /analysis/query
                              ↓
                        Backend encodes question to embedding
Step 3: Semantic Retrieval
Question embedding → ChromaDB similarity search (top-5 chunks)
                     ↓
            Chunks rank by cosine similarity score
Step 4: LLM Analysis
Retrieved chunks + question + system prompt → Groq LLM
                                               ↓
                         LLM generates forensic analysis
Step 5: Finding Extraction & Storage
LLM response parsed for:
  - Severity (HIGH/MEDIUM/LOW)
  - Category (revenue, cash flow, etc.)
  - Evidence (direct quotes from chunks)
  - Page reference

Stored in SQLAlchemy DB for audit trail

Project Structure
finsherlock/
│
├── frontend/                       # Next.js 14 application
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page
│   │   ├── dashboard/
│   │   │   ├── page.tsx           # Investigation workspace
│   │   │   ├── case/[id]/page.tsx
│   │   │   └── layout.tsx
│   │   └── api/                   # Optional API proxy routes
│   │
│   ├── components/
│   │   ├── ui/                    # Primitive components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── GlassPanel.tsx     # Custom design components
│   │   │   └── ...
│   │   ├── Landing/               # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── ...
│   │   ├── Dashboard/             # Investigation UI
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Workspace.tsx
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── RiskMeter.tsx
│   │   │   └── Terminal.tsx
│   │   ├── Sherry/                # AI mascot character
│   │   │   ├── SherryAvatar.tsx
│   │   │   └── SpeechBubble.tsx
│   │   └── ...
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useScrollReveal.ts
│   │   ├── useParallax.ts
│   │   ├── useMagneticButton.ts
│   │   ├── useTypewriter.ts
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── api.ts                 # Backend HTTP client
│   │   ├── utils.ts
│   │   └── cn.ts                  # TailwindCSS classname merge
│   │
│   ├── types/
│   │   ├── index.ts               # TypeScript interfaces
│   │   ├── report.ts
│   │   ├── finding.ts
│   │   └── ...
│   │
│   ├── public/
│   │   ├── sherry/                # Pixel-art character PNGs
│   │   │   ├── idle.png
│   │   │   ├── thinking.png
│   │   │   ├── speaking.png
│   │   │   └── ...
│   │   └── ...
│   │
│   ├── styles/
│   │   ├── globals.css            # Global styles + design tokens
│   │   └── animations.css         # Custom animation definitions
│   │
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
│
├── backend/                       # FastAPI application
│   ├── src/
│   │   ├── api/
│   │   │   ├── main.py            # FastAPI app + routes
│   │   │   ├── routes.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── services/
│   │   │   ├── pdf_service.py     # PDF text extraction
│   │   │   ├── chunker.py         # Text splitting logic
│   │   │   ├── vector_store.py    # ChromaDB wrapper
│   │   │   ├── analysis.py        # RAG + LLM orchestration
│   │   │   └── llm.py             # Groq API client
│   │   │
│   │   ├── rag/
│   │   │   ├── vector_store.py    # VectorStore class
│   │   │   ├── retriever.py       # Semantic search logic
│   │   │   └── prompt_templates.py
│   │   │
│   │   ├── models/
│   │   │   ├── database.py        # SQLAlchemy Base
│   │   │   ├── report.py
│   │   │   ├── investigation.py
│   │   │   └── finding.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── report.py          # Pydantic models
│   │   │   ├── analysis.py
│   │   │   └── findings.py
│   │   │
│   │   ├── extractors/
│   │   │   ├── pdf_extractor.py   # PyMuPDF wrapper
│   │   │   └── text_parser.py
│   │   │
│   │   ├── config.py              # Configuration
│   │   └── logging.py             # Logging setup
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── main.py                    # Entry point for Uvicorn
│
├── .gitignore
├── README.md
└── CONTRIBUTING.md

Development
Running Locally
Terminal 1 — Backend:
bash
cd backend
source venv/bin/activate
uvicorn src.api.main:app --reload --port 8000
Terminal 2 — Frontend:
bash
cd frontend
npm run dev
Open http://localhost:3000 in your browser.

Contributing
Contributions are welcome! Please follow these guidelines:
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request
Code Standards
Python: PEP 8 + Black formatter
TypeScript: ESLint + Prettier
Git Commits: Conventional Commits (commitlint)
Documentation: Clear docstrings + inline comments for complex logic
Reporting Issues
Use GitHub Issues with:
Clear title describing the problem
Steps to reproduce
Expected vs. actual behavior
System information (OS, Python/Node version)
Screenshots if applicable

License
This project is licensed under the MIT License — see the LICENSE file for details.

Acknowledgments
Groq — Fast LLM inference API
ChromaDB — Vector database
Sentence Transformers — Embedding models
FastAPI — Modern Python web framework
Next.js — React framework for production
