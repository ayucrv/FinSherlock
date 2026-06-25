'use client'
import { motion } from 'framer-motion'
import Sherry from '@/components/Sherry'
import { useEffect, useState } from 'react'

const messages = [
  "Analyzing balance sheet...",
  "Comparing with industry norms...",
  "I found something suspicious...",
  "This cash flow doesn't add up.",
  "Checking management discussion...",
  "Evidence collected."
]

export default function InvestigationProcess() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % messages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h2 className="font-display text-5xl text-gold-400 text-glow mb-6">Watch Sherry Work</h2>
          <p className="text-gray-400 text-lg">
            She cross-references footnotes, flags inconsistencies, and builds a case — all in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2 flex flex-col items-center"
        >
          <Sherry state="speaking" size={140} />
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 glass-panel px-6 py-3 text-center text-gold-400 font-mono"
          >
            {messages[step]}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}