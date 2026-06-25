export default function Footer() {
  return (
    <footer className="py-16 border-t border-gold-500/10">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
        <div className="mb-4 font-display text-gold-400 text-xl">FinSherlock</div>
        <p>Every Financial Statement Leaves Clues.</p>
        <div className="mt-6 space-x-6">
          <a href="#" className="hover:text-gold-400 transition">Twitter</a>
          <a href="#" className="hover:text-gold-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-gold-400 transition">Privacy</a>
        </div>
        <p className="mt-8">© 2025 FinSherlock Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}