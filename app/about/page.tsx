import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getPageBySlug } from '@/lib/cosmic'

export const metadata = {
  title: 'About the National Jeff Registry - All The Jeffs',
  description: 'Learn about the satirical National Jeff Registry and our mission to register and celebrate all Jeffs. Official Department of Jeff Affairs documentation since 2024.',
}

export default async function AboutPage() {
  const aboutData = await getPageBySlug('about')

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {aboutData?.metadata?.hero_title || 'About the National Jeff Registry'}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="card p-8">
            {aboutData?.metadata?.description && (
              <div 
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: aboutData.metadata.description }}
              />
            )}
            
            {!aboutData && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the National Jeff Registry</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>This is a comedy project that treats Jeffhood with the seriousness it deserves. We collect only what you share. Numbers are issued in order. If you change your name, your certificate becomes ceremonially void.</p>
                  <p><strong>One Nation, Under Jeff.</strong></p>
                </div>
              </div>
            )}
            
            {aboutData?.metadata?.cta_text && aboutData?.metadata?.cta_url && (
              <div className="text-center mt-8">
                <a
                  href={aboutData.metadata.cta_url}
                  className="btn-primary inline-flex items-center"
                >
                  {aboutData.metadata.cta_text}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}