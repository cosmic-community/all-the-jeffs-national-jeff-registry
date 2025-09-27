'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { JeffEntry } from '@/types'

interface SuccessContentProps {
  jeffData: JeffEntry
}

export function SuccessContent({ jeffData }: SuccessContentProps) {
  const [copyMessage, setCopyMessage] = useState('')
  
  const jeffNumber = jeffData.metadata.jeff_number
  const shareUrl = `${window.location.origin}/jeff/${jeffNumber}`
  const shareText = jeffData.metadata.social_preview_text

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyMessage('Link copied!')
      setTimeout(() => setCopyMessage(''), 2000)
    } catch (err) {
      setCopyMessage('Failed to copy')
      setTimeout(() => setCopyMessage(''), 2000)
    }
  }

  const shareOnX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank')
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome, Jeff #{jeffNumber}!
        </h1>
        <p className="text-xl text-gray-600">
          You have been successfully registered in the National Jeff Registry.
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      {/* Registry Confirmation */}
      <div className="card p-8 mb-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🦅</div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Official Jeff Registration
          </h2>
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">Congratulations! You are now</p>
            <p className="text-3xl font-bold text-primary">Jeff #{jeffNumber}</p>
            <p>in the National Jeff Registry</p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>One Nation, Under Jeff</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href={`/jeff/${jeffNumber}`} className="btn-primary">
          👀 View Your Jeff Page
        </Link>
        <Link href="/registry" className="btn-secondary">
          📋 Browse Registry
        </Link>
      </div>

      {/* Share Buttons */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Share Your Jeffhood
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            className="btn-secondary relative"
          >
            {copyMessage || 'Copy Link'}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-primary hover:underline">
          ← Return to Homepage
        </Link>
      </div>
    </div>
  )
}