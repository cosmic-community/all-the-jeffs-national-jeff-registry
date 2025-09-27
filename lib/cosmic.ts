import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get next Jeff number
export async function getNextJeffNumber(): Promise<number> {
  try {
    const response = await cosmic.objects.find({ type: 'jeff-entries' });
    return response.objects.length + 1;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return 1; // First Jeff
    }
    throw new Error('Failed to get next Jeff number');
  }
}

// Create Jeff Entry
export async function createJeffEntry(data: {
  name: string;
  email?: string;
  location?: string;
  age?: number;
  jeffNumber: number;
}) {
  const { name, email, location, age, jeffNumber } = data;
  
  const slug = `jeff-${jeffNumber}-${name.toLowerCase()}`;
  const shareLink = `https://allthejeffs.com/jeff/${jeffNumber}`;
  const socialPreviewText = `I am Jeff #${jeffNumber} in the National Jeff Registry.`;
  
  try {
    const response = await cosmic.objects.insertOne({
      type: 'jeff-entries',
      title: `Jeff #${jeffNumber} - ${name}`,
      slug,
      metadata: {
        name,
        email: email || '',
        location: location || '',
        age: age || 0,
        jeff_number: jeffNumber,
        share_link: shareLink,
        social_preview_text: socialPreviewText,
        date_registered: new Date().toISOString().split('T')[0]
      }
    });
    
    return response.object;
  } catch (error) {
    console.error('Error creating Jeff entry:', error);
    throw new Error('Failed to create Jeff entry');
  }
}

// Get Jeff by number
export async function getJeffByNumber(jeffNumber: number) {
  try {
    const response = await cosmic.objects.find({
      type: 'jeff-entries',
      'metadata.jeff_number': jeffNumber
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.objects[0] || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch Jeff');
  }
}

// Get all Jeff entries with pagination
export async function getAllJeffs(limit = 20, skip = 0, search?: string) {
  try {
    let query: any = { type: 'jeff-entries' };
    
    if (search) {
      // Search by location or Jeff number
      const jeffNumber = parseInt(search);
      if (!isNaN(jeffNumber)) {
        query['metadata.jeff_number'] = jeffNumber;
      } else {
        query['metadata.location'] = { $regex: search, $options: 'i' };
      }
    }

    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(limit)
      .skip(skip);
    
    // Sort by Jeff number descending (newest first)
    const sortedObjects = response.objects.sort((a: any, b: any) => {
      return (b.metadata?.jeff_number || 0) - (a.metadata?.jeff_number || 0);
    });
    
    return {
      objects: sortedObjects,
      total: response.total || 0
    };
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { objects: [], total: 0 };
    }
    throw new Error('Failed to fetch Jeffs');
  }
}

// Get Hall of Fame entries
export async function getHallOfFameEntries() {
  try {
    const response = await cosmic.objects
      .find({ type: 'hall-of-fame' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch Hall of Fame entries');
  }
}

// Get page by slug
export async function getPageBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'pages',
      slug
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}