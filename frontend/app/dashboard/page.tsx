'use client'
import DashboardLayout from '@/components/Dashboard/DashboardLayout'
import { useState } from 'react'
import { CaseFile, ChatMessage, Evidence, TimelineEvent } from '@/types'

const mockCaseFiles: CaseFile[] = [
  {
    id: '1',
    title: 'Acme Corp 10-K 2024',
    client: 'Acme Corp',
    date: '2024-03-01',
    status: 'active',
    evidenceCount: 12,
  },
  {
    id: '2',
    title: 'Globex Q3 Review',
    client: 'Globex Inc',
    date: '2024-05-15',
    status: 'active',
    evidenceCount: 7,
  },
  {
    id: '3',
    title: 'Initech Forensic',
    client: 'Initech',
    date: '2024-02-10',
    status: 'closed',
    evidenceCount: 20,
  },
]

const mockEvidence: Evidence[] = [
  {
    id: 'e1',
    title: 'Revenue Recognition Issue',
    excerpt: 'Deferred revenue...',
    risk: 'high',
    page: 24,
    documentName: 'Acme 10-K',
  },
  {
    id: 'e2',
    title: 'Inventory Spike',
    excerpt: 'Inventory up 45%...',
    risk: 'medium',
    page: 56,
    documentName: 'Acme 10-K',
  },
]

const mockTimeline: TimelineEvent[] = [
  {
    id: 't1',
    date: '2024-06-01',
    title: 'Document Uploaded',
    description: 'Acme 10-K PDF added.',
    type: 'action',
  },
  {
    id: 't2',
    date: '2024-06-01 14:23',
    title: 'Risk Detected',
    description: 'High risk: Revenue recognition.',
    type: 'finding',
  },
  {
    id: 't3',
    date: '2024-06-01 14:25',
    title: 'Sherry Comment',
    description: "This cash flow doesn't add up.",
    type: 'milestone',
  },
]

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState<CaseFile>(mockCaseFiles[0])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'sherry',
      content:
        'Welcome, investigator. I’m Sherry. Upload a document or select a case.',
      timestamp: new Date(),
    },
  ])

  const addMessage = (msg: ChatMessage) =>
    setChatMessages((prev) => [...prev, msg])

  return (
    <DashboardLayout
      caseFiles={mockCaseFiles}
      evidence={mockEvidence}
      timeline={mockTimeline}
      selectedCase={selectedCase}
      onSelectCase={setSelectedCase}
      chatMessages={chatMessages}
      onSendMessage={addMessage}
    />
  )
}