import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🇺🇸</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">All The Jeffs</h1>
              <p className="text-xs text-gray-500">National Jeff Registry</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/registry" className="text-gray-600 hover:text-gray-900 transition-colors">
              Registry
            </Link>
            <Link href="/hall-of-fame" className="text-gray-600 hover:text-gray-900 transition-colors">
              Hall of Fame
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/register" className="btn-primary">
              Register as Jeff
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link href="/register" className="text-sm bg-primary text-white px-4 py-2 rounded">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}