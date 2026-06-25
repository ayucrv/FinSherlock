'use client'
import { motion } from 'framer-motion'
import { GlowingCard } from '@/components/ui/GlowingCard'
import { FileText, Clock, AlertTriangle } from 'lucide-react'

const cases = [
  { client: 'NexGen Corp', risk: 'High', issue: 'Revenue recognition anomalies', date: '2024-03-15' },
  { client: 'SteelVault Ltd', risk: 'Medium', issue: 'Inventory overstatement', date: '2024-02-20' },
  { client: 'BioFlux Pharma', risk: 'High', issue: 'R&D capitalization concerns', date: '2024-01-10' },
  { client: 'AeroDynamics', risk: 'Low', issue: 'Minor related-party transactions', date: '2023-12-05' },
]

export default function CaseFiles() {
  return (
    <section id="case-files" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-display text-5xl text-gold-400 text-glow">Closed Case Files</h2>
          <p className="mt-4 text-gray-400">Real investigations our AI has cracked.</p>
        </motion.div>
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
          {cases.map((c, i) => (
            <motion.div key={c.client} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="snap-center shrink-0 w-80">
              <GlowingCard className="h-full flex flex-col" glowColor={c.risk === 'High' ? 'emerald' : 'gold'}>
                <div className="flex items-start justify-between mb-4">
                  <FileText className="text-gold-400" />
                  <span className={`text-xs px-2 py-1 rounded-full font-mono ${c.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    <AlertTriangle className="inline w-3 h-3 mr-1" /> {c.risk}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{c.client}</h3>
                <p className="text-sm text-gray-400 mt-2 flex-grow">{c.issue}</p>
                <div className="mt-4 flex items-center text-xs text-gray-500"><Clock className="w-3 h-3 mr-1" /> {c.date}</div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}