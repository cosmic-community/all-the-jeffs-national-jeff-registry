import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HallOfFameGrid } from '@/components/HallOfFameGrid'
import { getHallOfFameEntries } from '@/lib/cosmic'

export const metadata = {
  title: 'Jeff Hall of Fame - All The Jeffs',
  description: 'Distinguished Jeffs who brought honor to Jeffhood. Celebrating exceptional contributions to the National Jeff Registry.',
}

export default async function HallOfFamePage() {
  const hallOfFameEntries = await getHallOfFameEntries()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hall of Fame
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Distinguished Jeffs who brought honor to Jeffhood
          </p>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <HallOfFameGrid entries={hallOfFameEntries} />
      </main>
      <Footer />
    </div>
  )
}