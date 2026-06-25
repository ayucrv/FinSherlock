'use client'
import { CaseFile, Evidence, TimelineEvent, ChatMessage } from '@/types'
import EvidenceBoard from './EvidenceBoard'
import CaseFiles from './CaseFiles'
import TimelineSidebar from './TimelineSidebar'
import Workspace from './Workspace'
import SherryChat from './SherryChat'
import TerminalLogs from './TerminalLogs'
import { useState } from 'react'

interface Props {
  caseFiles: CaseFile[]; evidence: Evidence[]; timeline: TimelineEvent[]
  selectedCase: CaseFile; onSelectCase: (c: CaseFile) => void
  chatMessages: ChatMessage[]; onSendMessage: (m: ChatMessage) => void
}

export default function DashboardLayout({ caseFiles, evidence, timeline, selectedCase, onSelectCase, chatMessages, onSendMessage }: Props) {
  const [leftTab, setLeftTab] = useState<'evidence'|'cases'|'timeline'>('evidence')
  const [bottomOpen] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-noir-900 text-gray-200">
      <div className="h-14 border-b border-gold-500/20 flex items-center px-6 gap-4 bg-noir-800/50 backdrop-blur">
        <span className="font-display text-gold-400 text-xl">FinSherlock</span>
        <span className="text-sm text-gray-500">|</span>
        <span className="text-sm">{selectedCase.title}</span>
        <div className="ml-auto"><button className="text-sm text-gold-400 hover:underline" onClick={() => window.location.href='/'}>Exit Room</button></div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 border-r border-gold-500/20 flex flex-col bg-noir-800/30">
          <div className="flex border-b border-gold-500/10">
            {['evidence','cases','timeline'].map(tab => (
              <button key={tab} className={`flex-1 py-3 text-xs uppercase tracking-widest font-mono ${leftTab === tab ? 'text-gold-400 border-b-2 border-gold-400 bg-gold-500/5' : 'text-gray-500 hover:text-gray-300'}`} onClick={() => setLeftTab(tab as any)}>{tab}</button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {leftTab === 'evidence' && <EvidenceBoard evidence={evidence} />}
            {leftTab === 'cases' && <CaseFiles cases={caseFiles} selected={selectedCase} onSelect={onSelectCase} />}
            {leftTab === 'timeline' && <TimelineSidebar events={timeline} />}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6"><Workspace selectedCase={selectedCase} evidence={evidence} /></div>
          {bottomOpen && <div className="h-48 border-t border-gold-500/20 bg-noir-800/50"><TerminalLogs timeline={timeline} /></div>}
        </div>
        <div className="w-80 border-l border-gold-500/20 bg-noir-800/30 flex flex-col">
          <SherryChat messages={chatMessages} onSend={onSendMessage} />
        </div>
      </div>
    </div>
  )
}