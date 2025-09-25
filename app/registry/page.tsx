import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JeffRegistry } from '@/components/JeffRegistry'
import { getAllJeffs } from '@/lib/cosmic'

interface RegistryPageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

export const metadata = {
  title: 'Jeff Registry - All The Jeffs',
  description: 'Browse the complete National Jeff Registry. Search by Jeff Number or location to find registered Jeffs.',
}

export default async function RegistryPage({ searchParams }: RegistryPageProps) {
  const { search, page } = await searchParams
  const currentPage = parseInt(page || '1')
  const limit = 20
  const skip = (currentPage - 1) * limit

  const jeffsData = await getAllJeffs(limit, skip, search)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            The Registry
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Official directory of all registered Jeffs
          </p>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <JeffRegistry 
          initialJeffs={jeffsData.objects}
          totalJeffs={jeffsData.total}
          currentPage={currentPage}
          limit={limit}
        />
      </main>
      <Footer />
    </div>
  )
}