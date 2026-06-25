'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const links = ['Features', 'How It Works', 'Case Files', 'Statistics', 'Testimonials', 'FAQ']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-noir-900/90 backdrop-blur-md shadow-glow-gold' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-gold-400 tracking-wider">FinSherlock</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-300 hover:text-gold-400 transition-colors"
            >
              {link}
            </a>
          ))}
          <Button size="sm" variant="outline" onClick={() => window.location.href = '/dashboard'}>
            Launch App
          </Button>
        </div>
        <button className="md:hidden text-gold-400" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-noir-900/95 backdrop-blur-md px-6 pb-4"
          >
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-3 text-gray-300 hover:text-gold-400"
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <Button className="mt-4 w-full" size="sm" onClick={() => { setMobileOpen(false); window.location.href = '/dashboard' }}>
              Launch App
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}