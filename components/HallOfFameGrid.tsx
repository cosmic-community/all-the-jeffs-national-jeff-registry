import Link from 'next/link'
import type { HallOfFameEntry } from '@/types'

interface HallOfFameGridProps {
  entries: HallOfFameEntry[]
}

export function HallOfFameGrid({ entries }: HallOfFameGridProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">No Hall of Fame entries yet.</p>
        <p className="text-gray-500">Check back soon for distinguished Jeffs!</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {entries.map((entry) => (
        <div key={entry.id} className="card p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🏆</div>
            {entry.metadata.featured_image && (
              <img
                src={`${entry.metadata.featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`Featured image for ${entry.title}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
                width={400}
                height={300}
              />
            )}
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {entry.title}
            </h3>
            
            <div className="mb-4">
              <p className="text-lg font-semibold text-primary">
                Jeff #{entry.metadata.featured_jeff.metadata.jeff_number}
              </p>
              {entry.metadata.featured_jeff.metadata.location && (
                <p className="text-sm text-gray-600">
                  {entry.metadata.featured_jeff.metadata.location}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {entry.metadata.spotlight_reason}
              </span>
            </div>
            
            {entry.metadata.special_note && (
              <p className="text-gray-600 text-sm mb-4">
                {entry.metadata.special_note}
              </p>
            )}
            
            <Link
              href={`/jeff/${entry.metadata.featured_jeff.metadata.jeff_number}`}
              className="btn-secondary"
            >
              View Jeff Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}