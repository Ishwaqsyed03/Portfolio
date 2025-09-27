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
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeProjects(projects: Project[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
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
    const { title, description, technologies, image, github, live, featured } = body;

    if (!title || !description || !technologies || !image) {
      return NextResponse.json(
        { error: 'Title, description, technologies, and image are required' },
        { status: 400 }
      );
    }

    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const updatedProject: Project = {
      ...projects[projectIndex],
      title,
      description,
      technologies,
      image,
      github,
      live,
      featured: !!featured,
      updatedAt: new Date().toISOString(),
    };

    projects[projectIndex] = updatedProject;
    writeProjects(projects);

    return NextResponse.json(
      { message: 'Project updated successfully', project: updatedProject }
    );
  } catch (error) {
    console.error('PUT /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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
    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    projects.splice(projectIndex, 1);
    writeProjects(projects);

    return NextResponse.json(
      { message: 'Project deleted successfully' }
    );
  } catch (error) {
    console.error('DELETE /api/admin/projects/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}