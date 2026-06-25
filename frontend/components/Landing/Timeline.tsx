'use client'
import { motion } from 'framer-motion'

const events = [
  { year: '2023', title: 'Alpha Launch', desc: 'First prototype tested on 500 SEC filings.' },
  { year: '2024', title: 'Sherry 2.0', desc: 'Conversational AI with forensic reasoning.' },
  { year: '2024 Q3', title: 'Hackathon Winner', desc: 'Best AI Product at FinTech Summit.' },
  { year: '2025', title: 'Public Beta', desc: 'Open to select firms and auditors.' },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-center text-gold-400 text-glow mb-20"
        >
          The Case So Far
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-gold-500/50 to-transparent" />
          {events.map((ev, idx) => (
            <motion.div
              key={ev.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex items-center mb-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="w-1/2 px-8">
                <div className={`glass-panel p-6 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-gold-400 font-mono text-sm">{ev.year}</span>
                  <h3 className="text-xl font-bold mt-1">{ev.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{ev.desc}</p>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-gold-500 border-2 border-noir-900 z-10 shadow-glow-gold" />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}