'use client'
import { motion } from 'framer-motion'

export default function RiskMeter({ riskScore }: { riskScore: number }) {
  const normalized = riskScore / 100
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-gray-500 mb-1 font-mono">RISK INDEX</span>
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1f2937" strokeWidth="3" />
          <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke={normalized>0.7?'#ef4444':normalized>0.4?'#eab308':'#22c55e'} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${normalized*97.4} 100`} initial={{strokeDasharray:'0 100'}} animate={{strokeDasharray:`${normalized*97.4} 100`}} transition={{duration:1.5}} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold">{riskScore}</span></div>
      </div>
    </div>
  )
}