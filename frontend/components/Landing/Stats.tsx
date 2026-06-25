'use client'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', setDisplay)
    return () => {
      controls.stop()
      unsubscribe?.()
    }
  }, [count, rounded, to, duration])

  return <span>{display.toLocaleString()}</span>
}

export default function Stats() {
  return (
    <section id="statistics" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: 'Documents Analyzed', value: 12453 },
            { label: 'Red Flags Found', value: 2389 },
            { label: 'Accuracy Rate', value: 98.7, suffix: '%', decimals: 1 },
            { label: 'Fortune 500 Clients', value: 42 },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-display text-gold-400 text-glow mb-2">
                <Counter from={0} to={stat.value} duration={2.5} />
                {stat.suffix || ''}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}