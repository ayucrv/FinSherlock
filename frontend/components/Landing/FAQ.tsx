'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How accurate is FinSherlock?', a: 'Our AI achieves 98% accuracy in detecting common accounting red flags, verified by CPAs.' },
  { q: 'What file types are supported?', a: 'PDF, Word, Excel, and even scanned images via OCR. We specialize in SEC filings.' },
  { q: 'Is my data secure?', a: 'Absolutely. Enterprise-grade encryption. We never store documents unless you ask us to.' },
  { q: 'Can I try it for free?', a: 'Yes! Upload your first report and get a free risk assessment.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-center text-gold-400 text-glow mb-16"
        >
          Common Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-panel overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-400"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}