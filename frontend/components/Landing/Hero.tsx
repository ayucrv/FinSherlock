'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import Sherry from '@/components/Sherry'
import { Particles } from '@/components/ui/Particles'
import { useEffect, useState } from 'react'

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -150])
  const y2 = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 0.9])

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles count={40} />
      <div className="absolute inset-0 bg-gradient-to-b from-noir-900 via-midnight to-noir-900 z-0" />
      <div
        className="absolute top-20 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${(mousePos.x / window.innerWidth - 0.5) * 30}px, ${(mousePos.y / window.innerHeight - 0.5) * 30}px)`,
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${-(mousePos.x / window.innerWidth - 0.5) * 20}px, ${-(mousePos.y / window.innerHeight - 0.5) * 20}px)`,
        }}
      />

      <motion.div style={{ y: y1, opacity, scale }} className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-8 inline-block"
        >
          <Sherry size={120} state="investigating" />
        </motion.div>

        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-brass to-gold-400 text-glow"
        >
          FinSherlock
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-gray-400 font-light tracking-wide"
        >
          Every Financial Statement Leaves Clues.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" glowing onClick={() => window.location.href = '/dashboard'}>
            Start Investigation
          </Button>
          <Button size="lg" variant="outline">
            Watch Demo
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 left-10 hidden lg:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="glass-panel p-4 rotate-[-5deg] shadow-glow-gold">
          <div className="text-xs text-gold-400 font-mono">Exhibit A</div>
          <div className="text-sm mt-1">Revenue decline 12%</div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-10 hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="glass-panel p-4 rotate-[3deg] shadow-glow-emerald">
          <div className="text-xs text-emerald-400 font-mono">Red Flag</div>
          <div className="text-sm mt-1">Unusual inventory build</div>
        </div>
      </motion.div>
    </section>
  )
}