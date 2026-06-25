import { CaseFile, Evidence } from '@/types'
import RiskMeter from './RiskMeter'
import { Upload } from 'lucide-react'

export default function Workspace({ selectedCase, evidence }: { selectedCase: CaseFile; evidence: Evidence[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display text-gold-400">{selectedCase.title}</h1>
          <p className="text-sm text-gray-400 mt-1">Client: {selectedCase.client} · Status: {selectedCase.status}</p>
        </div>
        <RiskMeter riskScore={78} />
      </div>
      <div className="glass-panel p-8 min-h-[400px] flex flex-col items-center justify-center text-gray-500 bg-noir-800/50 border-dashed border-2 border-gold-500/20 hover:border-gold-400/50 transition cursor-pointer">
        <Upload className="w-12 h-12 mb-4 text-gold-400/50" />
        <p className="text-lg">Drop Annual Report or SEC Filing</p>
        <p className="text-sm">PDF, Word, Excel supported</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {evidence.map(e => (
          <div key={e.id} className="glass-panel p-4">
            <div className="font-bold text-sm">{e.title}</div>
            <div className="text-xs text-gray-400 mt-1">{e.excerpt}</div>
            <span className="mt-2 inline-block text-xs px-2 py-1 rounded bg-gold-500/10 text-gold-400">Page {e.page}</span>
          </div>
        ))}
      </div>
    </div>
  )
}