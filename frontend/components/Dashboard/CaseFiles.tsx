import { CaseFile } from '@/types'
import { Folder, Clock, CheckCircle } from 'lucide-react'

export default function CaseFiles({ cases, selected, onSelect }: { cases: CaseFile[]; selected: CaseFile; onSelect: (c: CaseFile) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4">Case Files</h3>
      {cases.map(c => (
        <div key={c.id} onClick={() => onSelect(c)} className={`glass-panel p-3 cursor-pointer transition ${selected.id===c.id?'border-gold-400 shadow-glow-gold':''}`}>
          <div className="flex items-center gap-2"><Folder className="w-4 h-4 text-gold-400" /><span className="text-sm font-medium">{c.title}</span></div>
          <div className="flex justify-between text-xs text-gray-500 mt-2"><span>{c.client}</span><span className="flex items-center gap-1">{c.status==='active'?<Clock className="w-3 h-3 text-emerald-400"/>:<CheckCircle className="w-3 h-3 text-gray-500"/>}{c.evidenceCount} items</span></div>
        </div>
      ))}
    </div>
  )
}