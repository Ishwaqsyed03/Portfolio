import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/experience.json');

interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

function readExperiences(): Experience[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading experiences:', error);
    return [];
  }
}

function writeExperiences(experiences: Experience[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(experiences, null, 2));
  } catch (error) {
    console.error('Error writing experiences:', error);
    throw new Error('Failed to save experiences');
  }
}

export async function GET(request: NextRequest) {
  try {
    const experiences = readExperiences();
    // Sort by start date (most recent first)
    experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    return NextResponse.json({ experiences });
  } catch (error) {
    console.error('GET /api/admin/experience error:', error);
    return NextResponse.json(
      { error: 'Failed to load experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { company, position, description, startDate, endDate, current, location, technologies } = body;

    if (!company || !position || !description || !startDate) {
      return NextResponse.json(
        { error: 'Company, position, description, and start date are required' },
        { status: 400 }
      );
    }

    if (!current && !endDate) {
      return NextResponse.json(
        { error: 'End date is required for non-current positions' },
        { status: 400 }
      );
    }

    const experiences = readExperiences();
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company,
      position,
      description,
      startDate,
      endDate: current ? undefined : endDate,
      current: !!current,
      location,
      technologies: technologies || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    experiences.push(newExperience);
    writeExperiences(experiences);

    return NextResponse.json(
      { message: 'Experience created successfully', experience: newExperience },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/experience error:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}