'use client'
import { useEffect, useState } from 'react'
import { TimelineEvent } from '@/types'
import { Terminal } from 'lucide-react'

export default function TerminalLogs({ timeline }: { timeline: TimelineEvent[] }) {
  const [logs, setLogs] = useState<string[]>([])
  useEffect(() => {
    setLogs([
      '> Initializing FinSherlock engine...',
      '> Loading case files...',
      '> Sherry online.',
      ...timeline.map(t => `[${t.date}] ${t.title}: ${t.description}`),
      '> Ready.',
    ])
  }, [timeline])
  return (
    <div className="h-full flex flex-col p-4 font-mono text-xs">
      <div className="flex items-center gap-2 text-gold-400 mb-2"><Terminal className="w-4 h-4"/><span className="uppercase tracking-widest">Investigation Logs</span></div>
      <div className="flex-1 overflow-y-auto space-y-1 text-gray-400">
        {logs.map((line,i)=><div key={i} className="hover:text-gray-200 transition">{line}</div>)}
      </div>
    </div>
  )
}