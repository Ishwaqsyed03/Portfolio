import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Load data dynamically to avoid import issues
    const dataPath = path.join(process.cwd(), 'src/content/data.ts');
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    
    // Parse the data (this is a simple approach - in production you'd want better parsing)
    const projectsMatch = dataContent.match(/export const PROJECTS = (\[[\s\S]*?\]);/);
    const experienceMatch = dataContent.match(/export const EXPERIENCE = (\[[\s\S]*?\]);/);
    const skillsMatch = dataContent.match(/export const SKILLS = (\[[\s\S]*?\]);/);

    if (!projectsMatch || !experienceMatch || !skillsMatch) {
      return NextResponse.json({ error: 'Could not parse data from data.ts' }, { status: 500 });
    }

    // Use eval to parse the data (not ideal but works for this case)
    const PROJECTS = eval(projectsMatch[1]);
    const EXPERIENCE = eval(experienceMatch[1]);
    const SKILLS = eval(skillsMatch[1]);

    // Migrate Projects
    const migratedProjects = PROJECTS.map((project: any) => ({
      id: crypto.randomUUID(),
      title: project.title,
      description: project.description,
      technologies: project.tech || [],
      image: '/placeholder-project.jpg', // You'll need to update these with actual images
      github: project.links?.find((l: any) => l.label.toLowerCase().includes('source'))?.href,
      live: project.links?.find((l: any) => l.label.toLowerCase().includes('demo') || l.label.toLowerCase().includes('website'))?.href,
      featured: true, // Mark existing projects as featured
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Migrate Experience
    const migratedExperience = EXPERIENCE.map((exp: any) => ({
      id: crypto.randomUUID(),
      company: exp.title.includes('—') ? exp.title.split('—')[0].trim() : exp.title,
      position: exp.title.includes('—') ? exp.title.split('—')[1]?.trim() || 'Developer' : 'Developer',
      description: exp.points.join('. '),
      startDate: exp.period.includes('—') ? 
        (exp.period.split('—')[0].trim() === '2024' ? '2024-01' : 
         exp.period.split('—')[0].trim() === '2023' ? '2023-01' : 
         exp.period.split('—')[0].trim() === '2022' ? '2022-01' : '2024-01') : '2024-01',
      endDate: exp.period.toLowerCase().includes('present') ? undefined : 
        (exp.period.includes('—') ? 
         (exp.period.split('—')[1].trim() === '2024' ? '2024-12' : 
          exp.period.split('—')[1].trim() === '2023' ? '2023-12' : '2024-12') : '2024-12'),
      current: exp.period.toLowerCase().includes('present'),
      location: 'Remote',
      technologies: [], // Extract from description if needed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Migrate Skills
    const migratedSkills = SKILLS.flatMap((skillGroup: any) => 
      skillGroup.items.map((skill: any) => ({
        id: crypto.randomUUID(),
        name: skill,
        level: Math.floor(Math.random() * 20) + 80, // Random level between 80-100 for existing skills
        category: skillGroup.title.includes('Full-Stack') ? 'Frontend' :
                 skillGroup.title.includes('AI') ? 'AI/ML' :
                 skillGroup.title.includes('Platform') ? 'Backend' : 'Other',
        icon: skillGroup.icon,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
    );

    // Write to JSON files
    fs.writeFileSync(
      path.join(DATA_DIR, 'projects.json'),
      JSON.stringify(migratedProjects, null, 2)
    );

    fs.writeFileSync(
      path.join(DATA_DIR, 'experience.json'),
      JSON.stringify(migratedExperience, null, 2)
    );

    fs.writeFileSync(
      path.join(DATA_DIR, 'skills.json'),
      JSON.stringify(migratedSkills, null, 2)
    );

    return NextResponse.json({
      message: 'Data migration completed successfully',
      migrated: {
        projects: migratedProjects.length,
        experience: migratedExperience.length,
        skills: migratedSkills.length,
      }
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed' },
      { status: 500 }
    );
  }
}