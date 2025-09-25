// app/success/[jeffNumber]/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SuccessContent } from '@/components/SuccessContent'
import { getJeffByNumber } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

interface SuccessPageProps {
  params: Promise<{ jeffNumber: string }>
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { jeffNumber } = await params
  const jeffNum = parseInt(jeffNumber)
  
  if (isNaN(jeffNum)) {
    notFound()
  }

  const jeffData = await getJeffByNumber(jeffNum)
  
  if (!jeffData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <SuccessContent jeffData={jeffData} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: SuccessPageProps) {
  const { jeffNumber } = await params
  const jeffNum = parseInt(jeffNumber)
  
  return {
    title: `Welcome Jeff #${jeffNum} - All The Jeffs`,
    description: `Congratulations Jeff #${jeffNum}! Your Certificate of Jeffthenticity is ready. Download and share your official Jeff credentials.`,
  }
}