import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glowing?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', glowing, ...props }, ref) => {
    const base = 'relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-50 overflow-hidden group'
    const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
    const variants = {
      primary: 'bg-gradient-to-r from-gold-500 to-brass text-noir-900 shadow-glow-gold hover:shadow-glow-emerald hover:from-emerald-500 hover:to-emerald-700',
      secondary: 'bg-noir-800 border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 hover:border-gold-500',
      outline: 'border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:text-gold-300',
      ghost: 'text-gold-400 hover:bg-gold-500/10',
    }
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(base, sizes[size], variants[variant], glowing && 'animate-pulse-slow shadow-glow-gold', className)}
        {...(props as any)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {glowing && <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
export default Button