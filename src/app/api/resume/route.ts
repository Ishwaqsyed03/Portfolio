import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    if (!fs.existsSync(resumePath)) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(resumePath);
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Ishwaq_Syed_Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return new NextResponse('Error downloading resume', { status: 500 });
  }
}