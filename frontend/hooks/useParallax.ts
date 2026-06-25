import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function useParallax(distance = 20) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 100, damping: 30 })
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      x.set((clientX - cx) / cx * distance)
      y.set((clientY - cy) / cy * distance)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, distance])

  return { x: springX, y: springY }
}