import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/projects.json');

export async function GET(request: NextRequest) {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ projects: [] });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const projects = JSON.parse(data);
    
    // Sort by featured first, then by updated date (most recent first)
    projects.sort((a: any, b: any) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ projects: [] });
  }
}