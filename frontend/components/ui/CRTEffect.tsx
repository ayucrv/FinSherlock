export function CRTEffect() {
  return <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-5" style={{
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
  }} />
}