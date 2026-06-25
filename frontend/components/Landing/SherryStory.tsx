'use client'
import { motion } from 'framer-motion'
import Sherry from '@/components/Sherry'

export default function SherryStory() {
  return (
    <section id="sherry-story" className="py-32 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-gold-500/5 to-noir-900 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Sherry image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <div className="glass-panel p-6 relative">
            <Sherry state="idle" size={140} />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 bg-noir-900 border border-gold-500/50 rounded-full px-3 py-1 text-xs font-mono text-gold-400 shadow-glow-gold"
            >
              🕵️‍♀️ Lead Detective
            </motion.div>
          </div>
        </motion.div>

        {/* Story text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="font-display text-4xl md:text-5xl text-gold-400 text-glow mb-6">
            Meet Sherry
          </h2>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              <span className="text-gold-400 font-semibold">Sherry</span> used to
              solve crimes in the gritty streets of Pixel City. She cracked jewel
              heists, exposed forgery rings, and once chased a mastermind across
              three continents.
            </p>
            <p>
              Then one day, while auditing her own taxes, she discovered
              something far more thrilling: <em>financial statements</em>. “Criminals
              leave fingerprints,” she thought, “but CFOs leave footnotes.”
            </p>
            <p>
              Now she’s hung up her magnifying glass (well, she still carries it)
              and dedicates her life to uncovering the hidden stories in
              balance sheets. Her motto? <span className="text-gold-400 italic">“Every number is a suspect.”</span>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            currently investigating your reports
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}