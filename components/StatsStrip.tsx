import Link from 'next/link'
import type { JeffEntry, HallOfFameEntry } from '@/types'

interface StatsStripProps {
  totalJeffs: number
  latestJeff?: JeffEntry
  featuredJeff?: HallOfFameEntry
}

export function StatsStrip({ totalJeffs, latestJeff, featuredJeff }: StatsStripProps) {
  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {totalJeffs.toLocaleString()}
            </div>
            <p className="text-gray-600">Total Registered Jeffs</p>
          </div>
          
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              #{latestJeff?.metadata?.jeff_number || 0}
            </div>
            <p className="text-gray-600">Most Recent Jeff</p>
            {latestJeff?.metadata?.location && (
              <p className="text-sm text-gray-500 mt-1">
                {latestJeff.metadata.location}
              </p>
            )}
          </div>
          
          <div>
            <div className="text-2xl font-bold text-primary mb-2">
              🏆 Jeff of the Month
            </div>
            {featuredJeff ? (
              <div>
                <p className="text-gray-600">
                  Jeff #{featuredJeff.metadata.featured_jeff.metadata.jeff_number}
                </p>
                <Link 
                  href="/hall-of-fame" 
                  className="text-sm text-primary hover:underline"
                >
                  View Hall of Fame
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">Coming Soon</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}