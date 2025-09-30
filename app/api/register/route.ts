import { NextRequest, NextResponse } from 'next/server'
import { getNextJeffNumber, createJeffEntry } from '@/lib/cosmic'
import { rateLimit } from '@/lib/rate-limiter'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Apply rate limiting (5 registrations per 15 minutes per IP)
    const rateLimitResult = rateLimit(ip, 5, 15 * 60 * 1000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many registration attempts. Please try again later.',
          resetTime: new Date(rateLimitResult.resetTime).toISOString()
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
          }
        }
      );
    }

    const data = await request.json()
    const { name, email, location, age } = data

    // Validate that name is Jeff
    if (!name || name.toLowerCase() !== 'jeff') {
      return NextResponse.json(
        { error: 'This registry is for Jeffs only. Please enter Jeff.' },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate age if provided
    if (age !== undefined && (age < 1 || age > 150)) {
      return NextResponse.json(
        { error: 'Please provide a valid age.' },
        { status: 400 }
      )
    }

    // Get the next Jeff number
    const jeffNumber = await getNextJeffNumber()

    // Create the Jeff entry
    const jeffEntry = await createJeffEntry({
      name: 'Jeff',
      email,
      location,
      age,
      jeffNumber
    })

    // Ensure jeffEntry and jeffEntry.id exist before proceeding
    if (!jeffEntry || !jeffEntry.id) {
      throw new Error('Failed to create Jeff entry - no ID returned')
    }

    const jeffId = jeffEntry.id
    
    return NextResponse.json(
      {
        success: true,
        jeffNumber,
        jeffId,
        message: `Welcome, Jeff #${jeffNumber}!`
      },
      {
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register Jeff. Please try again.' },
      { status: 500 }
    )
  }
}