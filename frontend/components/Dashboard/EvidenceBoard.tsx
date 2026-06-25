import { Evidence } from '@/types'
import { AlertTriangle, ChevronRight } from 'lucide-react'

export default function EvidenceBoard({ evidence }: { evidence: Evidence[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4">Evidence Locker</h3>
      {evidence.map(e => (
        <div key={e.id} className="glass-panel p-3 cursor-pointer hover:bg-gold-500/5 transition">
          <div className="flex items-start gap-2">
            <AlertTriangle className={`w-4 h-4 mt-0.5 ${e.risk==='high'?'text-red-400':'text-yellow-400'}`} />
            <div className="flex-1">
              <div className="text-sm font-medium">{e.title}</div>
              <div className="text-xs text-gray-500 mt-1">{e.excerpt}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-600"><span>Pg {e.page} · {e.documentName}</span><ChevronRight className="w-3 h-3" /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}