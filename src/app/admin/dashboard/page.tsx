'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePhotoSection from '@/components/admin/ProfilePhotoSection';

interface DashboardStats {
  projects: number;
  skills: number;
  experience: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ projects: 0, skills: 0, experience: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isMigrating, setIsMigrating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    fetch('/api/admin/verify')
      .then(response => {
        if (!response.ok) {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });

    // Load dashboard stats (mock data for now)
    setTimeout(() => {
      loadStats();
    }, 1000);
  }, [router]);

  const loadStats = async () => {
    try {
      const [projectsRes, skillsRes, experienceRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/skills'),
        fetch('/api/admin/experience')
      ]);

      const projects = await projectsRes.json();
      const skills = await skillsRes.json();
      const experience = await experienceRes.json();

      setStats({
        projects: projects.projects?.length || 0,
        skills: skills.skills?.length || 0,
        experience: experience.experiences?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats({ projects: 0, skills: 0, experience: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigration = async () => {
    if (!confirm('This will migrate your existing portfolio data to the admin system. Continue?')) {
      return;
    }

    setIsMigrating(true);
    try {
      const response = await fetch('/api/admin/migrate', { method: 'POST' });
      if (response.ok) {
        const result = await response.json();
        alert(`Migration successful! Migrated ${result.migrated.projects} projects, ${result.migrated.experience} experience items, and ${result.migrated.skills} skills.`);
        loadStats(); // Reload stats
      } else {
        const error = await response.json();
        alert(`Migration failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed. Please try again.');
    } finally {
      setIsMigrating(false);
    }
  };

  useEffect(() => {
    // Check authentication
    fetch('/api/admin/verify')
      .then(response => {
        if (!response.ok) {
          router.push('/admin/login');
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });

    // Load dashboard stats
    setTimeout(() => {
      loadStats();
    }, 1000);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-purple-300 mt-2">Welcome back! Here's an overview of your portfolio.</p>
        
        {/* Migration Button - Show if no data */}
        {!isLoading && stats.projects === 0 && stats.skills === 0 && stats.experience === 0 && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-yellow-300 font-medium">No Data Found</h3>
                <p className="text-yellow-400 text-sm">Migrate your existing portfolio data to the admin system</p>
              </div>
              <button
                onClick={handleMigration}
                disabled={isMigrating}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {isMigrating ? 'Migrating...' : 'Migrate Data'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-purple-300 truncate">Total Projects</dt>
                <dd className="text-3xl font-bold text-white">{stats.projects}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-purple-300 truncate">Skills</dt>
                <dd className="text-3xl font-bold text-white">{stats.skills}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-purple-300 truncate">Experience Items</dt>
                <dd className="text-3xl font-bold text-white">{stats.experience}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Photo Section */}
      <div className="mb-8">
        <ProfilePhotoSection />
      </div>

      {/* Quick Actions */}
      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/projects"
            className="flex flex-col items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-200 text-center"
          >
            <svg className="h-8 w-8 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-white font-medium">Add Project</span>
          </a>
          
          <a
            href="/admin/experience"
            className="flex flex-col items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-200 text-center"
          >
            <svg className="h-8 w-8 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
            </svg>
            <span className="text-white font-medium">Add Experience</span>
          </a>
          
          <a
            href="/admin/skills"
            className="flex flex-col items-center p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-200 text-center"
          >
            <svg className="h-8 w-8 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-white font-medium">Manage Skills</span>
          </a>
          
          <a
            href="/"
            target="_blank"
            className="flex flex-col items-center p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all duration-200 text-center"
          >
            <svg className="h-8 w-8 text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-white font-medium">View Portfolio</span>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-purple-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Portfolio admin system initialized</span>
            <span className="text-xs text-purple-400">Just now</span>
          </div>
          <div className="flex items-center space-x-3 text-purple-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Shader system updated with 4 themes</span>
            <span className="text-xs text-purple-400">1 hour ago</span>
          </div>
          <div className="flex items-center space-x-3 text-purple-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Navigation styling improved</span>
            <span className="text-xs text-purple-400">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}