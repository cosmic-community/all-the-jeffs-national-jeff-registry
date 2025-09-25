import puppeteer from 'puppeteer';
import type { JeffEntry } from '@/types';

export interface CertificateData {
  jeffNumber: number;
  name: string;
  dateRegistered: string;
}

// Generate certificate HTML template
function generateCertificateHTML(data: CertificateData, type: 'pdf' | 'image' = 'pdf') {
  const { jeffNumber, name, dateRegistered } = data;
  
  const isImage = type === 'image';
  const containerClass = isImage ? 'w-[1080px] h-[1080px]' : 'w-[8.5in] h-[11in]';
  const textSize = isImage ? 'text-2xl' : 'text-xl';
  const titleSize = isImage ? 'text-4xl' : 'text-3xl';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Certificate of Jeffthenticity - Jeff #${jeffNumber}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          margin: 0; 
          padding: 0;
          background: #fefefe;
        }
        .certificate-border {
          border: 8px solid #1f2937;
          border-image: linear-gradient(45deg, #1f2937, #374151) 1;
        }
        .decorative-border {
          background-image: 
            repeating-linear-gradient(
              0deg,
              #1f2937,
              #1f2937 2px,
              transparent 2px,
              transparent 10px
            ),
            repeating-linear-gradient(
              90deg,
              #1f2937,
              #1f2937 2px,
              transparent 2px,
              transparent 10px
            );
          background-size: 100% 20px, 20px 100%;
          background-position: 0 0, 0 0;
          background-repeat: repeat-x, repeat-y;
        }
        .eagle-icon {
          font-size: ${isImage ? '48px' : '36px'};
        }
      </style>
    </head>
    <body class="bg-gray-50">
      <div class="${containerClass} mx-auto bg-white shadow-2xl">
        <div class="certificate-border decorative-border h-full p-12 flex flex-col justify-between">
          
          <!-- Header with Eagle -->
          <div class="text-center mb-8">
            <div class="eagle-icon mb-4">🦅</div>
            <h1 class="${titleSize} font-serif font-bold text-gray-900 mb-2">
              Official Certificate of Jeffthenticity
            </h1>
            <div class="w-32 h-1 bg-gray-800 mx-auto"></div>
          </div>
          
          <!-- Main Certificate Body -->
          <div class="flex-1 flex flex-col justify-center ${textSize} text-gray-800 leading-relaxed text-center">
            <p class="mb-6">
              This certifies that <strong>Jeff #${jeffNumber}</strong>,<br>
              also known as <strong>${name}</strong>,<br>
              has been duly registered in the National Jeff Registry<br>
              on this day, <strong>${new Date(dateRegistered).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</strong>.
            </p>
            
            <p class="mb-8">
              This document verifies the bearer's eternal Jeffhood<br>
              and grants all rights, privileges, and duties<br>
              associated with being a Jeff.
            </p>
          </div>
          
          <!-- Footer Section -->
          <div class="flex justify-between items-end">
            <!-- Seal -->
            <div class="text-left">
              <div class="w-20 h-20 border-4 border-gray-800 rounded-full flex items-center justify-center mb-2">
                <span class="text-xs font-bold text-gray-800">DEPT<br>JEFF<br>AFFAIRS</span>
              </div>
              <p class="text-sm text-gray-700">
                Verified by the<br>Department of Jeff Affairs
              </p>
            </div>
            
            <!-- Center Tagline -->
            <div class="text-center">
              <p class="text-lg font-serif font-bold text-gray-900">
                One Nation, Under Jeff
              </p>
            </div>
            
            <!-- Signature Line -->
            <div class="text-right">
              <div class="border-b-2 border-gray-800 w-48 mb-2"></div>
              <p class="text-sm text-gray-700">
                Supreme Jeff Commissioner
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </body>
    </html>
  `;
}

// Generate PDF certificate
export async function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    const html = generateCertificateHTML(data, 'pdf');
    
    await page.setContent(html);
    
    const pdf = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    return pdf;
  } catch (error) {
    console.error('Error generating PDF certificate:', error);
    throw new Error('Failed to generate PDF certificate');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Generate PNG certificate image (social sharing)
export async function generateCertificateImage(data: CertificateData): Promise<Buffer> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    const html = generateCertificateHTML(data, 'image');
    
    await page.setViewport({ width: 1080, height: 1080 });
    await page.setContent(html);
    
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1080,
        height: 1080
      }
    });
    
    return screenshot;
  } catch (error) {
    console.error('Error generating certificate image:', error);
    throw new Error('Failed to generate certificate image');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}