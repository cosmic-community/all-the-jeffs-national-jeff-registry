'use client'

import Link from 'next/link'
import type { JeffEntry } from '@/types'

interface JeffProfileProps {
  jeffData: JeffEntry
}

export function JeffProfile({ jeffData }: JeffProfileProps) {
  const jeffNumber = jeffData.metadata.jeff_number
  const shareUrl = `${window.location.origin}/jeff/${jeffNumber}`
  const shareText = jeffData.metadata.social_preview_text

  const shareOnX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Jeff #{jeffNumber}
        </h1>
        <p className="text-lg text-gray-600">
          Official member of the National Jeff Registry
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      {/* Registry Badge */}
      <div className="card p-8 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🦅</div>
          <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
            Official Jeff Registration
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>This Jeff is registered as</p>
            <p className="text-2xl font-bold text-primary">Jeff #{jeffNumber}</p>
            <p>in the National Jeff Registry</p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>One Nation, Under Jeff</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Jeff Details */}
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Jeff Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Jeff Number:</span>
            <span className="font-semibold">#{jeffNumber}</span>
          </div>
          {jeffData.metadata.location && (
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>{jeffData.metadata.location}</span>
            </div>
          )}
          {jeffData.metadata.age && jeffData.metadata.age > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Age:</span>
              <span>{jeffData.metadata.age}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Registered:</span>
            <span>{new Date(jeffData.metadata.date_registered).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Jeff</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={shareOnX}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Share on X
          </button>
          <button
            onClick={shareOnFacebook}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share on Facebook
          </button>
          <button
            onClick={handleCopyLink}
            className="btn-secondary"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/register" className="btn-primary">
          Join the Registry
        </Link>
        <p className="mt-4 text-sm text-gray-600">
          <Link href="/registry" className="text-primary hover:underline">
            Browse all registered Jeffs
          </Link>
        </p>
      </div>
    </div>
  )
}