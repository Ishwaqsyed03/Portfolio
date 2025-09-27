import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/experience.json');

export async function GET(request: NextRequest) {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ experiences: [] });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const experiences = JSON.parse(data);
    
    // Sort by start date (most recent first)
    experiences.sort((a: any, b: any) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    return NextResponse.json({ experiences });
  } catch (error) {
    console.error('Error loading experiences:', error);
    return NextResponse.json({ experiences: [] });
  }
}