'use client'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types'
import Sherry from '@/components/Sherry'
import { Send, Loader2 } from 'lucide-react'

interface Props {
  messages: ChatMessage[]
  onSend: (msg: ChatMessage) => void
}

export default function SherryChat({ messages, onSend }: Props) {
  const [input, setInput] = useState('')
  const [sherryState, setSherryState] = useState<'idle' | 'thinking' | 'speaking'>('idle')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    onSend({
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
    })
    setInput('')
    setSherryState('thinking')
    setTimeout(() => {
      onSend({
        id: (Date.now() + 1).toString(),
        sender: 'sherry',
        content: 'Interesting. Let me cross-reference...',
        timestamp: new Date(),
      })
      setSherryState('speaking')
      setTimeout(() => setSherryState('idle'), 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gold-500/20 flex items-center gap-3">
        <Sherry size={40} state={sherryState} />
        <div>
          <div className="text-sm font-bold text-gold-400">Sherry</div>
          <div className="text-xs text-gray-500">AI Investigator</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                msg.sender === 'user'
                  ? 'bg-gold-500/20 text-gold-100'
                  : 'bg-noir-700/80 text-gray-200 border border-gold-500/20'
              }`}
            >
              {msg.isThinking ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> thinking...
                </span>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gold-500/20">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Sherry..."
            className="flex-1 bg-noir-800 border border-gold-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 text-gray-200 placeholder-gray-600"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gold-500/20 rounded-lg text-gold-400 hover:bg-gold-500/30 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}