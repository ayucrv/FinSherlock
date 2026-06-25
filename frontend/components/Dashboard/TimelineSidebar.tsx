import { TimelineEvent } from '@/types'

export default function TimelineSidebar({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-4">Investigation Timeline</h3>
      <div className="relative border-l border-gold-500/30 pl-4 space-y-6">
        {events.map(ev => (
          <div key={ev.id} className="relative">
            <div className="absolute -left-[20px] top-1 w-3 h-3 rounded-full bg-gold-500 border-2 border-noir-900" />
            <div className="text-xs text-gold-400 font-mono">{ev.date}</div>
            <div className="text-sm font-medium">{ev.title}</div>
            <div className="text-xs text-gray-500 mt-1">{ev.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}