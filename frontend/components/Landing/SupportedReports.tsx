'use client'
import { motion } from 'framer-motion'
import { FileText, FileSpreadsheet, ScrollText } from 'lucide-react'

const reports = [
  { icon: FileText, name: '10-K Annual Report' },
  { icon: FileSpreadsheet, name: '10-Q Quarterly' },
  { icon: ScrollText, name: '8-K Current Report' },
  { icon: FileText, name: 'Annual Reports (PDF)' },
  { icon: FileSpreadsheet, name: 'Earnings Releases' },
  { icon: ScrollText, name: 'Proxy Statements' },
]

export default function SupportedReports() {
  return (
    <section id="supported-reports" className="py-32 bg-noir-800/20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-gold-400 text-glow mb-16"
        >
          We Speak SEC
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {reports.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-panel p-6 flex flex-col items-center gap-4"
            >
              <r.icon className="w-8 h-8 text-gold-400" />
              <span className="text-sm font-medium">{r.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}