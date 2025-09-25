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

  return (
    <div className="min-h-screen">
      <Header />
      <main>
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
  )
}