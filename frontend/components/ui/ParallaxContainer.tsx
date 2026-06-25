'use client'
import { useParallax } from '@/hooks/useParallax'
import { motion } from 'framer-motion'
import React from 'react'
export function ParallaxContainer({ children, distance = 20 }: { children: React.ReactNode; distance?: number }) {
  const { x, y } = useParallax(distance)
  return <motion.div style={{ x, y }}>{children}</motion.div>
}