import { useRef, useState } from 'react'

export function useMagnetic(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    setPosition({
      x: (clientX - (left + width / 2)) * threshold,
      y: (clientY - (top + height / 2)) * threshold,
    })
  }

  return { ref, position, handleMouseMove, handleMouseLeave: () => setPosition({ x: 0, y: 0 }) }
}