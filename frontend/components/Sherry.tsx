'use client'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const stateMap: Record<string, string> = {
  idle: '/sherry/sherry-og.png',
  thinking: '/sherry/sherry-thinking.png',
  speaking: '/sherry/sherry-explaining.png',
  investigating: '/sherry/sherry-investigating.png',
  found: '/sherry/sherry-found-something.png',
}

interface SherryProps {
  state?: keyof typeof stateMap
  size?: number
}

export default function Sherry({ state = 'idle', size = 120 }: SherryProps) {
  const src = stateMap[state] || stateMap.idle

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative inline-block"
        style={{ width: size, height: size * 1.2 }}
      >
        <Image
          src={src}
          alt="Sherry"
          width={256}
          height={304}
          className="object-contain"
          style={{ width: size, height: size * 1.2 }}
          priority
        />
      </motion.div>
    </AnimatePresence>
  )
}