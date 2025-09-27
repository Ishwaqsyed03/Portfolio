import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/projects.json');

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

function readProjects(): Project[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

function writeProjects(projects: Project[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error writing projects:', error);
    throw new Error('Failed to save projects');
  }
}

export async function GET(request: NextRequest) {
  try {
    const projects = readProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('GET /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to load projects' },
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
    const { title, description, technologies, image, github, live, featured } = body;

    if (!title || !description || !technologies || !image) {
      return NextResponse.json(
        { error: 'Title, description, technologies, and image are required' },
        { status: 400 }
      );
    }

    const projects = readProjects();
    const newProject: Project = {
      id: crypto.randomUUID(),
      title,
      description,
      technologies,
      image,
      github,
      live,
      featured: !!featured,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.push(newProject);
    writeProjects(projects);

    return NextResponse.json(
      { message: 'Project created successfully', project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/admin/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}