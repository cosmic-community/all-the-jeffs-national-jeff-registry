import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <h3 className="text-xl font-bold">All The Jeffs</h3>
                <p className="text-gray-400 text-sm">National Jeff Registry</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg font-serif">
              One Nation, Under Jeff.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Registry</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Register as Jeff
                </Link>
              </li>
              <li>
                <Link href="/registry" className="hover:text-white transition-colors">
                  Browse Registry
                </Link>
              </li>
              <li>
                <Link href="/hall-of-fame" className="hover:text-white transition-colors">
                  Hall of Fame
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Department of Jeff Affairs. All rights reserved.</p>
          <p className="mt-2 text-sm">One site. All the Jeffs.</p>
        </div>
      </div>
    </footer>
  )
}