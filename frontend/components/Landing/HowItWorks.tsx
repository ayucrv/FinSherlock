'use client'
import { motion } from 'framer-motion'
import { Upload, Search, MessageCircle, FileCheck } from 'lucide-react'

const steps = [
  { icon: Upload, title: 'Upload Document', desc: 'Drop any annual report, 10-K, or financial PDF.' },
  { icon: Search, title: 'AI Investigation', desc: 'Sherry scans thousands of data points for red flags.' },
  { icon: MessageCircle, title: 'Conversational Q&A', desc: 'Ask questions and get detective-style explanations.' },
  { icon: FileCheck, title: 'Evidence Report', desc: 'Export a forensic report with highlighted risks.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-noir-800/30 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-center text-gold-400 text-glow mb-20"
        >
          How The Investigation Unfolds
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30">
                <step.icon className="w-7 h-7 text-gold-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}