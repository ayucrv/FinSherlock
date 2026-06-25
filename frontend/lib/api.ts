const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function uploadPDF(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Upload failed' }))
    throw new Error(err.detail || 'Upload failed')
  }
  return res.json() as Promise<UploadResponse>
}

export async function sendMessage(reportId: string, question: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ report_id: reportId, question }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Chat failed' }))
    throw new Error(err.detail || 'Chat failed')
  }
  return res.json() as Promise<ChatResponse>
}

export async function fetchReports() {
  const res = await fetch(`${API_BASE}/reports`)
  if (!res.ok) throw new Error('Failed to fetch reports')
  return res.json() as Promise<ReportListItem[]>
}

export async function fetchReportDetail(reportId: string) {
  const res = await fetch(`${API_BASE}/report/${reportId}`)
  if (!res.ok) throw new Error('Failed to fetch report details')
  return res.json() as Promise<ReportDetail>
}

// Types matching your backend responses
export interface UploadResponse {
  report_id: string
  filename: string
  company: string
  pages: number
  summary: string
  metrics: Record<string, number | string>
  risks: { description: string; severity: 'high' | 'medium' | 'low' }[]
}

export interface ChatResponse {
  case: string
  question: string
  answer: string
  metrics: Record<string, number | string>
  risks: { description: string; severity: 'high' | 'medium' | 'low' }[]
}

export interface ReportListItem {
  id: string
  company: string
  filename: string
  pages: number
  created_at: string
}

export interface ReportDetail {
  id: string
  company: string
  filename: string
  pages: number
  text_preview: string
  created_at: string
}