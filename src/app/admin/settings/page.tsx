'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
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

    setIsLoading(false);
  }, [router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password change functionality would be implemented here in a production environment');
  };

  const handleBackup = async () => {
    try {
      const projects = await fetch('/api/admin/projects').then(r => r.json());
      const skills = await fetch('/api/admin/skills').then(r => r.json());
      const experience = await fetch('/api/admin/experience').then(r => r.json());
      
      const backup = {
        timestamp: new Date().toISOString(),
        data: {
          projects: projects.projects || [],
          skills: skills.skills || [],
          experience: experience.experiences || []
        }
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Backup failed:', error);
      alert('Backup failed. Please try again.');
    }
  };

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
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-purple-300 mt-2">Manage your admin panel settings and preferences</p>
      </div>

      <div className="grid gap-8">
        {/* Account Settings */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Current Email
              </label>
              <input
                type="email"
                value="admin@portfolio.com"
                disabled
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-purple-400 rounded-lg opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave empty to keep current password"
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Data Management */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20">
              <div>
                <h3 className="text-white font-medium">Backup Portfolio Data</h3>
                <p className="text-purple-300 text-sm">Download a complete backup of your portfolio content</p>
              </div>
              <button
                onClick={handleBackup}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 border border-green-500/30"
              >
                Download Backup
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20">
              <div>
                <h3 className="text-white font-medium">Clear All Data</h3>
                <p className="text-purple-300 text-sm">Permanently delete all projects, skills, and experience data</p>
              </div>
              <button
                onClick={() => alert('This would clear all data in a production environment')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 border border-red-500/30"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Settings */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Portfolio Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Shader Theme</h3>
                <p className="text-purple-300 text-sm">Current background shader effect</p>
              </div>
              <select className="px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500">
                <option>Cosmic Energy</option>
                <option>Flowing Waves</option>
                <option>Ether</option>
                <option>Geometric</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Contact Form</h3>
                <p className="text-purple-300 text-sm">Allow visitors to send messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-300">Version:</span>
                <span className="text-white">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Last Updated:</span>
                <span className="text-white">Just now</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Framework:</span>
                <span className="text-white">Next.js 15.5.3</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-purple-300">Database:</span>
                <span className="text-white">JSON Files</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Storage:</span>
                <span className="text-white">Local File System</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-300">Status:</span>
                <span className="text-green-400">✓ Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}