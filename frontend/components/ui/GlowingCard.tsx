import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: 'gold' | 'emerald'
}

export function GlowingCard({ children, className, glowColor = 'gold' }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)' }}
      className={cn(
        'glass-panel p-6 relative overflow-hidden transition-all duration-500',
        glowColor === 'emerald' && 'hover:shadow-[0_0_25px_rgba(46,204,113,0.3)]',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}