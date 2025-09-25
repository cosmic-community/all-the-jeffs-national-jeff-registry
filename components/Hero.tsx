import Link from 'next/link'
import type { Page } from '@/types'

interface HeroProps {
  pageData?: Page | null
}

export function Hero({ pageData }: HeroProps) {
  const heroTitle = pageData?.metadata?.hero_title || 'Welcome to the National Jeff Registry'
  const description = pageData?.metadata?.description || '<p>Are you a Jeff? Join thousands of other Jeffs in the official National Jeff Registry and receive your certified Jeff Number. Get your official Certificate of Jeffthenticity and prove your eternal Jeffhood to the world.</p><p>One Nation, Under Jeff.</p>'
  const ctaText = pageData?.metadata?.cta_text || 'Get Your Jeff Number'
  const ctaUrl = pageData?.metadata?.cta_url || '/register'

  return (
    <section className="hero-gradient py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            All The Jeffs
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            {heroTitle}
          </h2>
          
          <div 
            className="text-xl text-gray-600 mb-12 prose prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          
          <Link href={ctaUrl} className="btn-primary text-xl px-8 py-4 inline-flex items-center">
            {ctaText}
            <span className="ml-2">🇺🇸</span>
          </Link>
          
          <p className="mt-8 text-sm text-gray-500">
            One site. All the Jeffs.
          </p>
        </div>
      </div>
    </section>
  )
}