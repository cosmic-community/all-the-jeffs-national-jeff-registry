import { NextRequest, NextResponse } from 'next/server'
import { getNextJeffNumber, createJeffEntry } from '@/lib/cosmic'
import { generateCertificatePDF, generateCertificateImage } from '@/lib/certificate-generator'

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

    // Generate certificates
    const certificateData = {
      jeffNumber,
      name: 'Jeff',
      dateRegistered: new Date().toISOString().split('T')[0]
    }

    // Generate PDF and image certificates
    const [pdfBuffer, imageBuffer] = await Promise.all([
      generateCertificatePDF(certificateData),
      generateCertificateImage(certificateData)
    ])

    // In a real application, you would upload these to your file storage
    // For now, we'll return success with the Jeff number
    
    return NextResponse.json({
      success: true,
      jeffNumber,
      jeffId: jeffEntry.id,
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