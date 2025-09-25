'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { JeffEntry } from '@/types'

interface JeffRegistryProps {
  initialJeffs: JeffEntry[]
  totalJeffs: number
  currentPage: number
  limit: number
}

export function JeffRegistry({ initialJeffs, totalJeffs, currentPage, limit }: JeffRegistryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  
  const totalPages = Math.ceil(totalJeffs / limit)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) {
      params.set('search', search.trim())
    }
    router.push(`/registry?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/registry?${params.toString()}`)
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by number or location"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-gray-600">
          {totalJeffs === 0 ? 'No Jeffs found' : 
           `Showing ${initialJeffs.length} of ${totalJeffs} registered Jeffs`}
        </p>
      </div>

      {/* Jeff List */}
      {initialJeffs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No Jeffs found. Recruit a Jeff!</p>
          <Link href="/register" className="btn-primary">
            Register the First Jeff
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {initialJeffs.map((jeff) => (
            <div key={jeff.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Jeff #{jeff.metadata.jeff_number}
                  </h3>
                  {jeff.metadata.location && (
                    <p className="text-gray-600">{jeff.metadata.location}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Registered {new Date(jeff.metadata.date_registered).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/jeff/${jeff.metadata.jeff_number}`}
                  className="btn-secondary"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          })}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}