import { MetadataRoute } from 'next'
import { getAllJeffs } from '@/lib/cosmic'
import { JeffEntry } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://allthejeffs.com'
  
  // Get all Jeff entries for dynamic routes
  const jeffsData = await getAllJeffs(1000, 0) // Get up to 1000 Jeffs
  
  const jeffRoutes = jeffsData.objects.map((jeff: JeffEntry) => {
    // Safely handle date parsing with validation
    let lastModified = new Date()
    
    try {
      const dateString = jeff.modified_at || jeff.created_at
      if (dateString) {
        const parsedDate = new Date(dateString)
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          lastModified = parsedDate
        }
      }
    } catch (error) {
      // If date parsing fails, use current date
      console.error('Error parsing date for Jeff:', jeff.id, error)
    }
    
    return {
      url: `${baseUrl}/jeff/${jeff.metadata.jeff_number}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/registry`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hall-of-fame`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  return [...staticRoutes, ...jeffRoutes]
}