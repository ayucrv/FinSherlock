export interface Evidence {
  id: string
  title: string
  excerpt: string
  risk: 'high' | 'medium' | 'low'
  page: number
  documentName: string
}

export interface CaseFile {
  id: string
  title: string
  client: string
  date: string
  status: 'active' | 'closed'
  evidenceCount: number
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'sherry'
  content: string
  timestamp: Date
  isThinking?: boolean
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'finding' | 'action' | 'milestone'
}