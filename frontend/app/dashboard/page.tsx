'use client'
import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import { useState, useEffect } from 'react'
import { CaseFile, ChatMessage, Evidence, TimelineEvent } from '@/types'
import { fetchReports, uploadPDF } from '@/lib/api'


export default function DashboardPage() {
  const [caseFiles, setCaseFiles] = useState<CaseFile[]>([])
  const [selectedCase, setSelectedCase] = useState<CaseFile | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'sherry',
      content: 'Welcome, investigator. Upload a document or select a case.',
      timestamp: new Date(),
    },
  ])
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Fetch existing reports on mount
  useEffect(() => {
    fetchReports()
      .then(data => {
        const cases: CaseFile[] = data.map(r => ({
          id: r.id,
          title: `${r.company} - ${r.filename}`,
          client: r.company,
          date: new Date(r.created_at).toISOString().split('T')[0],
          status: 'active',
          evidenceCount: 0,
        }))
        setCaseFiles(cases)
        if (cases.length > 0) setSelectedCase(cases[0])
      })
      .catch(console.error)
  }, [])

  // Load evidence/timeline when case changes (you could fetch from backend if needed)
  useEffect(() => {
    if (!selectedCase) return
    // For now, set mock evidence; you can later fetch per-report risks
    setEvidence([])
    setTimeline([
      { id: 't0', date: new Date().toISOString(), title: 'Case Opened', description: `Investigating ${selectedCase.client}`, type: 'action' }
    ])
  }, [selectedCase])

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const result = await uploadPDF(file)
      const newCase: CaseFile = {
        id: result.report_id,
        title: `${result.company} - ${result.filename}`,
        client: result.company,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        evidenceCount: result.risks?.length || 0,
      }
      setCaseFiles(prev => [newCase, ...prev])
      setSelectedCase(newCase)

      // Populate initial analysis into chat
      const sherrySummary: ChatMessage = {
        id: Date.now().toString(),
        sender: 'sherry',
        content: `**Analysis Complete**\n\n${result.summary}\n\nDetected ${result.risks?.length || 0} risk(s). Ask me anything about this report.`,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, sherrySummary])

      // Map risks to evidence
      const mappedEvidence: Evidence[] = (result.risks || []).map((r, i) => ({
        id: `e${i}`,
        title: r.description,
        excerpt: '',
        risk: r.severity,
        page: 0,
        documentName: result.filename,
      }))
      setEvidence(mappedEvidence)

     const newTimelineItems: TimelineEvent[] = [
  {
    id: `t${Date.now()}`,
    date: new Date().toISOString(),
    title: 'Report Uploaded',
    description: result.filename,
    type: 'action',
  },
];
if (result.risks?.length > 0) {
  newTimelineItems.push({
    id: `t${Date.now() + 1}`,
    date: new Date().toISOString(),
    title: 'Risks Detected',
    description: `${result.risks.length} risk(s) found`,
    type: 'finding',
  });
}
setTimeline(prev => [...prev, ...newTimelineItems]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'sherry',
        content: `Upload failed: ${err.message}`,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, errorMsg])
    } finally {
      setIsUploading(false)
    }
  }

  const handleSendMessage = async (msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg])
    if (msg.sender !== 'user') return

    // Fetch response from backend
    try {
      if (!selectedCase) throw new Error('No case selected')
      const res = await import('@/lib/api').then(m => m.sendMessage(selectedCase.id, msg.content))
      const sherryMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'sherry',
        content: res.answer,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, sherryMsg])

      // Update evidence with new risks if any
      if (res.risks?.length) {
        const newEvidence: Evidence[] = res.risks.map((r, i) => ({
          id: `e-new-${Date.now()}-${i}`,
          title: r.description,
          excerpt: '',
          risk: r.severity,
          page: 0,
          documentName: selectedCase.title,
        }))
        setEvidence(prev => [...prev, ...newEvidence])
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'sherry',
        content: `Error: ${err.message}`,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, errorMsg])
    }
  }

  if (!selectedCase && !isUploading && caseFiles.length === 0) {
    // Empty state - prompt upload
    return (
      <DashboardLayout
        caseFiles={caseFiles}
        evidence={[]}
        timeline={[]}
        selectedCase={{ id: 'empty', title: 'No cases yet', client: '', date: '', status: 'active', evidenceCount: 0 }}
        onSelectCase={() => {}}
        chatMessages={chatMessages}
        onSendMessage={handleSendMessage}
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    )
  }

  if (!selectedCase) return null

  return (
    <DashboardLayout
      caseFiles={caseFiles}
      evidence={evidence}
      timeline={timeline}
      selectedCase={selectedCase}
      onSelectCase={setSelectedCase}
      chatMessages={chatMessages}
      onSendMessage={handleSendMessage}
      onUpload={handleUpload}
      isUploading={isUploading}
    />
  )
}