import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  technologies: string[];
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use imported projects data directly
    try {
      setProjects(projectsData || []);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { projects, loading, error };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const data = await response.json();
          setSkills(data.skills || []);
        } else {
          setError('Failed to load skills');
        }
      } catch (err) {
        setError('Failed to load skills');
        console.error('Error loading skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
}

export function useExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch('/api/experience');
        if (response.ok) {
          const data = await response.json();
          setExperiences(data.experiences || []);
        } else {
          setError('Failed to load experiences');
        }
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error loading experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
}