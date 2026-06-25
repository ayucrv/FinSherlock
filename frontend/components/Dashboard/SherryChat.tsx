'use client'
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types'
import Sherry from '@/components/Sherry'
import { Send, Loader2, Terminal } from 'lucide-react'
import { sendMessage } from '@/lib/api'

interface Props {
  messages: ChatMessage[]
  onSend: (msg: ChatMessage) => void
  reportId: string
}

export default function SherryChat({ messages, onSend, reportId }: Props) {
  const [input, setInput] = useState('')
  const [sherryState, setSherryState] = useState<'idle' | 'thinking' | 'speaking'>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
    }
    onSend(userMsg)
    setInput('')
    setIsLoading(true)
    setSherryState('thinking')

    try {
      const data = await sendMessage(reportId, userMsg.content)
      const sherryMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'sherry',
        content: data.answer,
        timestamp: new Date(),
      }
      onSend(sherryMsg)
      setSherryState('speaking')
      setTimeout(() => setSherryState('idle'), 2500)
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'sherry',
        content: `Investigation interrupted: ${err.message}`,
        timestamp: new Date(),
      }
      onSend(errorMsg)
      setSherryState('idle')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-noir-900/50">
      {/* Header */}
      <div className="p-4 border-b border-gold-500/20 flex items-center gap-3 backdrop-blur">
        <Sherry size={40} state={sherryState} />
        <div className="flex-1">
          <div className="text-sm font-bold text-gold-400">Sherry</div>
          <div className="text-xs text-gray-500 font-mono">
            {isLoading ? 'analysing...' : 'online'}
          </div>
        </div>
        <Terminal className="w-4 h-4 text-gray-600" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
                msg.sender === 'user'
                  ? 'bg-gold-500/15 text-gold-100 border border-gold-500/20'
                  : 'bg-noir-800 text-gray-200 border border-gold-500/10'
              }`}
            >
              {msg.isThinking ? (
                <span className="flex items-center gap-2 text-gold-400">
                  <Loader2 className="w-3 h-3 animate-spin" /> thinking...
                </span>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg px-4 py-2 text-sm bg-noir-800 text-gold-400 border border-gold-500/10">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Sherry is investigating...
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input – detective prompt style */}
      <div className="p-4 border-t border-gold-500/20 bg-noir-900/80 backdrop-blur">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600 font-mono">
          <Terminal className="w-3 h-3" /> ask sherry &gt;
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1 bg-noir-800 border border-gold-500/30 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-gold-400 text-gray-200 placeholder-gray-600 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="p-2 bg-gold-500/20 rounded-lg text-gold-400 hover:bg-gold-500/30 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}