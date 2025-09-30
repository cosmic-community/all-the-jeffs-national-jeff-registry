import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CosmicBadge } from '@/components/CosmicBadge'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'All The Jeffs - Official National Jeff Registry',
  description: 'The Official Registry of Jeffs in America. Get your Jeff Number, download your certificate, and join the nation of Jeffs.',
  keywords: 'Jeff, registry, certificate, comedy, satire, National Jeff Registry',
  authors: [{ name: 'Department of Jeff Affairs' }],
  openGraph: {
    title: 'All The Jeffs - Official National Jeff Registry',
    description: 'Join the National Jeff Registry! Get your official Jeff Number and Certificate of Jeffthenticity.',
    type: 'website',
    locale: 'en_US',
    siteName: 'All The Jeffs',
    url: 'https://allthejeffs.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All The Jeffs - Official National Jeff Registry',
    description: 'Join the National Jeff Registry! Get your official Jeff Number and Certificate of Jeffthenticity.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://allthejeffs.com',
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        {/* Security headers meta tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇺🇸</text></svg>" />
        
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <div className="min-h-screen bg-background">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
              Skip to main content
            </a>
            {children}
          </div>
          <CosmicBadge bucketSlug={bucketSlug} />
        </ErrorBoundary>
      </body>
    </html>
  )
}