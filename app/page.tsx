import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { StatsStrip } from '@/components/StatsStrip'
import { Footer } from '@/components/Footer'
import { getPageBySlug, getAllJeffs, getHallOfFameEntries } from '@/lib/cosmic'

export default async function HomePage() {
  // Fetch homepage content and stats
  const [homepageData, jeffsData, hallOfFameData] = await Promise.all([
    getPageBySlug('homepage'),
    getAllJeffs(1, 0), // Get just the latest Jeff for stats
    getHallOfFameEntries()
  ])

  const totalJeffs = jeffsData.total
  const latestJeff = jeffsData.objects[0]
  const featuredJeff = hallOfFameData[0]

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'All The Jeffs - National Jeff Registry',
    description: 'The Official Registry of Jeffs in America. Get your Jeff Number, download your certificate, and join the nation of Jeffs.',
    url: 'https://allthejeffs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://allthejeffs.com/registry?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <Header />
        <main id="main-content">
          <Hero pageData={homepageData} />
          <HowItWorks />
          <StatsStrip 
            totalJeffs={totalJeffs}
            latestJeff={latestJeff}
            featuredJeff={featuredJeff}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}