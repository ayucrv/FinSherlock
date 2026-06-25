// frontend/components/Dashboard/Workspace.tsx
'use client'
import { CaseFile, Evidence } from '@/types'
import RiskMeter from './RiskMeter'
import { Upload, Loader2 } from 'lucide-react'
import { useRef } from 'react'

interface Props {
  selectedCase: CaseFile
  evidence: Evidence[]
  onUpload: (file: File) => Promise<void>
  isUploading: boolean
}

export default function Workspace({ selectedCase, evidence, onUpload, isUploading }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null!)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await onUpload(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display text-gold-400">{selectedCase.title}</h1>
          <p className="text-sm text-gray-400 mt-1">Client: {selectedCase.client} · Status: {selectedCase.status}</p>
        </div>
        <RiskMeter riskScore={evidence.length > 0 ? 78 : 0} />
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`glass-panel p-8 min-h-[300px] flex flex-col items-center justify-center text-gray-500 bg-noir-800/50 border-dashed border-2 transition cursor-pointer ${
          isUploading ? 'border-gold-400' : 'border-gold-500/20 hover:border-gold-400/50'
        }`}
      >
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {isUploading ? (
          <>
            <Loader2 className="w-12 h-12 mb-4 text-gold-400 animate-spin" />
            <p className="text-lg">Analyzing document...</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 mb-4 text-gold-400/50" />
            <p className="text-lg">Drop Annual Report or SEC Filing</p>
            <p className="text-sm">PDF only (10-K, 10-Q, etc.)</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {evidence.map(e => (
          <div key={e.id} className="glass-panel p-4">
            <div className={`font-bold text-sm ${e.risk === 'high' ? 'text-red-400' : e.risk === 'medium' ? 'text-yellow-400' : 'text-emerald-400'}`}>
              {e.title}
            </div>
            <div className="text-xs text-gray-400 mt-1">{e.excerpt}</div>
            <span className="mt-2 inline-block text-xs px-2 py-1 rounded bg-gold-500/10 text-gold-400">Page {e.page}</span>
          </div>
        ))}
      </div>
    </div>
  )
}