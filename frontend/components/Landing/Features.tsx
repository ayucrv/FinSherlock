'use client'
import { GlowingCard } from '@/components/ui/GlowingCard'
import { motion } from 'framer-motion'
import { Search, ShieldAlert, MessageSquare, FileText, BarChart3, Zap } from 'lucide-react'

const features = [
  { icon: Search, title: 'Deep Investigation', desc: 'AI scans every footnote, MD&A, and financial detail with detective precision.', glow: 'gold' },
  { icon: ShieldAlert, title: 'Risk Detection', desc: 'Flags accounting red flags, earnings manipulation, and hidden liabilities.', glow: 'emerald' },
  { icon: MessageSquare, title: 'Conversational Sherry', desc: 'Your AI partner explains findings in plain English, not financial jargon.', glow: 'gold' },
  { icon: FileText, title: 'Multi-Report Analysis', desc: '10-Ks, 10-Qs, annual reports, SEC filings — all parsed instantly.', glow: 'emerald' },
  { icon: BarChart3, title: 'Visual Evidence', desc: 'Charts, timelines, and highlighted PDFs show exactly where issues hide.', glow: 'gold' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Minutes, not days. Get preliminary findings before your coffee cools.', glow: 'emerald' },
]

export default function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl text-gold-400 text-glow">Sherlock-Level Insights</h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Not just another AI wrapper. FinSherlock is built like a forensic accounting lab.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlowingCard glowColor={feat.glow as any}>
                <feat.icon className={`w-8 h-8 mb-4 ${feat.glow === 'gold' ? 'text-gold-400' : 'text-emerald-400'}`} />
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-gray-400 text-sm">{feat.desc}</p>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}