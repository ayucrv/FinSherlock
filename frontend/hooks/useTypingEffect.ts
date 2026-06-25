import { useState, useEffect, useRef } from 'react'

export function useTypingEffect(text: string, speed = 30, enabled = true) {
  const [displayText, setDisplayText] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    if (!enabled) { setDisplayText(text); return }
    setDisplayText('')
    indexRef.current = 0
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.substring(0, indexRef.current + 1))
        indexRef.current++
      } else clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, enabled])

  return displayText
}