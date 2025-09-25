// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Jeff Entry type
export interface JeffEntry extends CosmicObject {
  type: 'jeff-entries';
  metadata: {
    name: string;
    email?: string;
    location?: string;
    age?: number;
    jeff_number: number;
    certificate_pdf?: {
      url: string;
      imgix_url?: string;
    };
    certificate_image?: {
      url: string;
      imgix_url: string;
    };
    share_link: string;
    social_preview_text: string;
    date_registered: string;
  };
}

// Hall of Fame type
export interface HallOfFameEntry extends CosmicObject {
  type: 'hall-of-fame';
  metadata: {
    featured_jeff: JeffEntry;
    spotlight_reason: string;
    special_note?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Page type
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title?: string;
    hero_title?: string;
    description?: string;
    cta_text?: string;
    cta_url?: string;
    seo_title?: string;
    seo_description?: string;
    og_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Registration form data
export interface RegistrationFormData {
  name: string;
  email?: string;
  location?: string;
  age?: number;
}

// Certificate generation response
export interface CertificateResponse {
  jeffNumber: number;
  pdfUrl: string;
  imageUrl: string;
  shareUrl: string;
}