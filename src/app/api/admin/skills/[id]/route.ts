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
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeSkills(skills: Skill[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(skills, null, 2));
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
    const skillIndex = skills.findIndex(s => s.id === id);

    if (skillIndex === -1) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    const updatedSkill: Skill = {
      ...skills[skillIndex],
      name,
      level,
      category,
      icon,
      updatedAt: new Date().toISOString(),
    };

    skills[skillIndex] = updatedSkill;
    writeSkills(skills);

    return NextResponse.json(
      { message: 'Skill updated successfully', skill: updatedSkill }
    );
  } catch (error) {
    console.error('PUT /api/admin/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
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
    const skills = readSkills();
    const skillIndex = skills.findIndex(s => s.id === id);

    if (skillIndex === -1) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    skills.splice(skillIndex, 1);
    writeSkills(skills);

    return NextResponse.json(
      { message: 'Skill deleted successfully' }
    );
  } catch (error) {
    console.error('DELETE /api/admin/skills/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}