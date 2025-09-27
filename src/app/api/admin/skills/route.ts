import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/skills.json');

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

function readSkills(): Skill[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading skills:', error);
    return [];
  }
}

function writeSkills(skills: Skill[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(skills, null, 2));
  } catch (error) {
    console.error('Error writing skills:', error);
    throw new Error('Failed to save skills');
  }
}

export async function GET(request: NextRequest) {
  try {
    const skills = readSkills();
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('GET /api/admin/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to load skills' },
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
    const { name, level, category, icon } = body;

    if (!name || level === undefined || !category) {
      return NextResponse.json(
        { error: 'Name, level, and category are required' },
        { status: 400 }
      );
    }

    if (level < 0 || level > 100) {
      return NextResponse.json(
        { error: 'Level must be between 0 and 100' },
        { status: 400 }
      );
    }

    const skills = readSkills();
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name,
      level,
      category,
      icon,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    skills.push(newSkill);
    writeSkills(skills);

    return NextResponse.json(
      { message: 'Skill created successfully', skill: newSkill },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/skills error:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}