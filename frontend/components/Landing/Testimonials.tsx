'use client'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  { quote: 'FinSherlock caught a revenue manipulation scheme our auditors missed.', author: 'CFO, Fortune 500 Tech' },
  { quote: 'Like having a forensic accountant on speed dial. Sherry is incredible.', author: 'Hedge Fund Analyst' },
  { quote: 'The UX is out of this world. Feels like a game, works like a pro tool.', author: 'VC Partner' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-5xl text-center text-gold-400 text-glow mb-20"
        >
          What Investigators Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-panel p-8 relative"
            >
              <Quote className="text-gold-400/30 absolute top-4 left-4 w-12 h-12" />
              <p className="text-gray-300 italic relative z-10">"{t.quote}"</p>
              <p className="mt-4 text-sm text-gold-400 font-semibold">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}