'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

const CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Tools',
  'Other'
];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 50,
    category: 'Frontend',
    icon: '',
  });

  useEffect(() => {
    // Check authentication
    fetch('/api/admin/verify')
      .then(response => {
        if (!response.ok) {
          router.push('/admin/login');
          return;
        }
        loadSkills();
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingSkill 
        ? `/api/admin/skills/${editingSkill.id}`
        : '/api/admin/skills';
      
      const method = editingSkill ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        loadSkills();
        setShowForm(false);
        setEditingSkill(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save skill:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      const response = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        loadSkills();
      }
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 50,
      category: 'Frontend',
      icon: '',
    });
  };

  const startEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || '',
    });
    setShowForm(true);
  };

  const getSkillsByCategory = () => {
    const categorized: { [key: string]: Skill[] } = {};
    CATEGORIES.forEach(category => {
      categorized[category] = skills.filter(skill => skill.category === category);
    });
    return categorized;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const skillsByCategory = getSkillsByCategory();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-purple-300 mt-2">Manage your technical skills and expertise levels</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingSkill(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Add Skill
        </button>
      </div>

      {/* Skill Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                  resetForm();
                }}
                className="text-purple-300 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Skill Level ({formData.level}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-purple-900/30 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-purple-400 mt-1">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Icon (Optional)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="e.g., react, javascript, python"
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  {editingSkill ? 'Update Skill' : 'Create Skill'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSkill(null);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills by Category */}
      <div className="space-y-8">
        {CATEGORIES.map((category) => (
          <div key={category} className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              {category}
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {skillsByCategory[category].length}
              </span>
            </h2>
            
            {skillsByCategory[category].length === 0 ? (
              <p className="text-purple-300/70 italic">No skills in this category yet.</p>
            ) : (
              <div className="grid gap-4">
                {skillsByCategory[category].map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                        {skill.icon && (
                          <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                            {skill.icon}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-purple-900/30 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-sm text-purple-300 w-12">{skill.level}%</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => startEdit(skill)}
                        className="p-2 text-purple-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}