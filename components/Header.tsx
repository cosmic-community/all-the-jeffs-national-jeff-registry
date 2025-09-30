'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2" aria-label="All The Jeffs Homepage">
            <span className="text-2xl" role="img" aria-label="American Flag">🇺🇸</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">All The Jeffs</h1>
              <p className="text-xs text-gray-500">National Jeff Registry</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            <Link href="/registry" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
              Registry
            </Link>
            <Link href="/hall-of-fame" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
              Hall of Fame
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
              About
            </Link>
            <Link href="/register" className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Register as Jeff
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/registry" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registry
              </Link>
              <Link 
                href="/hall-of-fame" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hall of Fame
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/register" 
                className="btn-primary text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register as Jeff
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}