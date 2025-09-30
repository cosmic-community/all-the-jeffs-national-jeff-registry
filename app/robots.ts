import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard-console-capture.js'],
    },
    sitemap: 'https://allthejeffs.com/sitemap.xml',
  }
}