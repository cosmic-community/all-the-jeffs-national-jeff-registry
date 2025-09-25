// app/jeff/[jeffNumber]/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JeffProfile } from '@/components/JeffProfile'
import { getJeffByNumber } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

interface JeffPageProps {
  params: Promise<{ jeffNumber: string }>
}

export default async function JeffPage({ params }: JeffPageProps) {
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
        <JeffProfile jeffData={jeffData} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: JeffPageProps) {
  const { jeffNumber } = await params
  const jeffNum = parseInt(jeffNumber)
  
  const jeffData = await getJeffByNumber(jeffNum)
  
  if (!jeffData) {
    return {
      title: 'Jeff Not Found - All The Jeffs',
    }
  }

  return {
    title: `Jeff #${jeffNum} - National Jeff Registry`,
    description: jeffData.metadata.social_preview_text,
    openGraph: {
      title: `Jeff #${jeffNum} - National Jeff Registry`,
      description: jeffData.metadata.social_preview_text,
      images: jeffData.metadata.certificate_image ? [jeffData.metadata.certificate_image.imgix_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Jeff #${jeffNum} - National Jeff Registry`,
      description: jeffData.metadata.social_preview_text,
      images: jeffData.metadata.certificate_image ? [jeffData.metadata.certificate_image.imgix_url] : [],
    },
  }
}