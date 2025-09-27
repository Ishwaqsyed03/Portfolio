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
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeExperiences(experiences: Experience[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(experiences, null, 2));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
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
    const experienceIndex = experiences.findIndex(e => e.id === id);

    if (experienceIndex === -1) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    const updatedExperience: Experience = {
      ...experiences[experienceIndex],
      company,
      position,
      description,
      startDate,
      endDate: current ? undefined : endDate,
      current: !!current,
      location,
      technologies: technologies || [],
      updatedAt: new Date().toISOString(),
    };

    experiences[experienceIndex] = updatedExperience;
    writeExperiences(experiences);

    return NextResponse.json(
      { message: 'Experience updated successfully', experience: updatedExperience }
    );
  } catch (error) {
    console.error('PUT /api/admin/experience/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const experiences = readExperiences();
    const experienceIndex = experiences.findIndex(e => e.id === id);

    if (experienceIndex === -1) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }

    experiences.splice(experienceIndex, 1);
    writeExperiences(experiences);

    return NextResponse.json(
      { message: 'Experience deleted successfully' }
    );
  } catch (error) {
    console.error('DELETE /api/admin/experience/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}