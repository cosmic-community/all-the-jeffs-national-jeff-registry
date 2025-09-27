import { NextRequest, NextResponse } from 'next/server'
import { getNextJeffNumber, createJeffEntry } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, location, age } = data

    // Validate that name is Jeff
    if (name.toLowerCase() !== 'jeff') {
      return NextResponse.json(
        { error: 'This registry is for Jeffs only. Please enter Jeff.' },
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
    
    return NextResponse.json({
      success: true,
      jeffNumber,
      jeffId,
      message: `Welcome, Jeff #${jeffNumber}!`
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register Jeff. Please try again.' },
      { status: 500 }
    )
  }
}