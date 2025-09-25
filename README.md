# All The Jeffs - National Jeff Registry

![All The Jeffs Preview](https://imgix.cosmicjs.com/af00fa70-9a30-11f0-a9ab-e96a06d60994-photo-1553095066-5014bc7b7f2d-1758819432862.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A satirical comedy website that serves as the official National Jeff Registry. People named Jeff can register to receive their unique Jeff Number and an official Certificate of Jeffthenticity. The platform celebrates the absurdity of bureaucracy while providing a fun, interactive experience.

## Features

- **⚡ Lightning-fast Registration** - Simple one-form process assigns sequential Jeff Numbers
- **📜 Auto-generated Certificates** - PDF and social media image certificates created instantly  
- **👤 Public Jeff Profiles** - Each Jeff gets their own page at `/jeff/[number]` with share buttons
- **🔍 Registry Search** - Public directory of all registered Jeffs with location filtering
- **🏆 Hall of Fame** - Featured Jeffs with special recognition and achievements
- **⚙️ Admin Dashboard** - Simple management interface for featured Jeffs and reports
- **📱 Social Sharing** - Built-in share buttons for X, Facebook, and link copying
- **🎨 Official Design** - Government-style interface with decorative certificates

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d572fde4b13704227fb56c&clone_repository=68d575e2e4b13704227fb58c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a comedy website called All The Jeffs. The purpose is to let people named Jeff register and be assigned a unique Jeff Number, then receive a sharable certificate.

1. Jeff Entry
	•	Name (string, required, must equal "Jeff")
	•	Email (string, optional, used for certificate delivery)
	•	Location (string, optional, city/state)
	•	Age (number, optional)
	•	Jeff Number (auto-increment unique ID starting at 1)
	•	Certificate PDF (file, auto-generated with Jeff's number and details)
	•	Certificate Image (file, auto-generated sharable JPG/PNG version)
	•	Share Link (URL, public-facing link like allthejeffs.com/jeff/[number])
	•	Social Preview Text (string, auto-generated: "I am Jeff #[number] in the National Jeff Registry.")
	•	Date Registered (timestamp, auto-generated)

2. Certificates
	•	Jeff Number (reference to Jeff Entry)
	•	Certificate File (PDF)
	•	Certificate Image (PNG/JPG, designed for social sharing)

3. Pages
	•	Homepage: hero title, description, and call to action ("Register as a Jeff")
	•	Registry Page: list of all registered Jeffs with filters by number or location
	•	About Page: copy explaining the satire of the National Jeff Registry
	•	Jeff Hall of Fame: special spotlight entries chosen manually

4. SEO (on all pages)
	•	Title (string)
	•	Description (string)
	•	Open Graph Image (file)

⸻

Certificate Template Text

Header:
"Official Certificate of Jeffthenticity"

Body Text:
This certifies that Jeff #[Jeff Number]
also known as [Name, always Jeff]
has been duly registered in the National Jeff Registry on this day, [Date Registered].

This document verifies the bearer's eternal Jeffhood and grants all rights, privileges, and duties associated with being a Jeff.

Seal/Watermark:
"Verified by the Department of Jeff Affairs"

Tagline (bottom of certificate):
"One Nation, Under Jeff."

Signature Line:

⸻

Supreme Jeff Commissioner

⸻

Certificate Formats:
	•	PDF: for printing and framing.
	•	Image (PNG/JPG): square or vertical, optimized for sharing on Instagram, TikTok, Twitter, and Facebook."

### Code Generation Prompt

> Create a public comedy website called All The Jeffs that registers people named Jeff, assigns a unique Jeff Number, and issues a printable and shareable certificate.

Goals
	1.	Lightning fast signup that assigns the next sequential Jeff Number
	2.	Auto create a PDF and a social image certificate
	3.	Public Jeff profile page at /jeff/[number] with share buttons
	4.	Registry browse and search
	5.	Simple admin view to manage reports and featured Jeffs

Tech
	•	Next.js + React + Tailwind
	•	Cosmic CMS for content and Jeff records
	•	Server actions or API routes for secure create and generate
	•	HTML to PDF for the certificate PDF
	•	HTML to PNG for the share image
	•	No user accounts needed. One form, one happy Jeff

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Puppeteer** - PDF and image generation
- **React Hook Form** - Form handling and validation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the content model set up

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd all-the-jeffs
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
ADMIN_SHARED_SECRET=your-admin-secret
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetch Jeff Entries
```typescript
const response = await cosmic.objects.find({
  type: 'jeff-entries'
}).props(['id', 'title', 'slug', 'metadata']).depth(1);
```

### Register a New Jeff
```typescript
const newJeff = await cosmic.objects.insertOne({
  type: 'jeff-entries',
  title: `Jeff #${jeffNumber} - ${name}`,
  slug: `jeff-${jeffNumber}-${name.toLowerCase()}`,
  metadata: {
    name: 'Jeff',
    email,
    location,
    age,
    jeff_number: jeffNumber,
    share_link: `https://allthejeffs.com/jeff/${jeffNumber}`,
    social_preview_text: `I am Jeff #${jeffNumber} in the National Jeff Registry.`,
    date_registered: new Date().toISOString().split('T')[0]
  }
});
```

## Cosmic CMS Integration

The application uses three main content types:

1. **Jeff Entries** - Core registration data with unique Jeff Numbers
2. **Hall of Fame** - Featured Jeffs with spotlight reasons
3. **Pages** - Dynamic content for homepage, about, and other pages

All content is managed through Cosmic's dashboard, with automatic certificate generation and social sharing capabilities.

## Deployment Options

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

For production, make sure to set all required environment variables in your hosting platform's dashboard.

<!-- README_END -->