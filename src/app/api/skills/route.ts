import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/skills.json');

export async function GET(request: NextRequest) {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ skills: [] });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const skills = JSON.parse(data);
    
    // Sort by category and then by level (highest first)
    skills.sort((a: any, b: any) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return b.level - a.level;
    });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Error loading skills:', error);
    return NextResponse.json({ skills: [] });
  }
}