import type { Metadata } from 'next'
import { Inter, Cinzel, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'FinSherlock - Every Financial Statement Leaves Clues',
  description: 'AI Financial Investigator that analyzes documents with detective precision.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}