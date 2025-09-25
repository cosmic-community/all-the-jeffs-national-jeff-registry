import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CosmicBadge } from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

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
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}