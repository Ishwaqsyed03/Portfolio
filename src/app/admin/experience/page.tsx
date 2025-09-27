'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    technologies: [],
  });

  useEffect(() => {
    // Check authentication
    fetch('/api/admin/verify')
      .then(response => {
        if (!response.ok) {
          router.push('/admin/login');
          return;
        }
        loadExperiences();
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  const loadExperiences = async () => {
    try {
      const response = await fetch('/api/admin/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data.experiences || []);
      }
    } catch (error) {
      console.error('Failed to load experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingExperience 
        ? `/api/admin/experience/${editingExperience.id}`
        : '/api/admin/experience';
      
      const method = editingExperience ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          endDate: formData.current ? undefined : formData.endDate,
        }),
      });

      if (response.ok) {
        loadExperiences();
        setShowForm(false);
        setEditingExperience(null);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const response = await fetch(`/api/admin/experience/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        loadExperiences();
      }
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      technologies: [],
    });
  };

  const startEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      position: experience.position,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate || '',
      current: experience.current,
      location: experience.location || '',
      technologies: experience.technologies,
    });
    setShowForm(true);
  };

  const handleTechAdd = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()]
      }));
    }
  };

  const handleTechRemove = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Experience</h1>
          <p className="text-purple-300 mt-2">Manage your work experience and career history</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditingExperience(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Add Experience
        </button>
      </div>

      {/* Experience Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingExperience(null);
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">Start Date</label>
                  <input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">End Date</label>
                  <input
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    disabled={formData.current}
                    className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => setFormData(prev => ({ ...prev, current: e.target.checked }))}
                  className="rounded border-purple-500/30 text-purple-500 focus:ring-purple-500"
                />
                <label htmlFor="current" className="ml-2 text-sm text-purple-300">
                  This is my current position
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">Technologies Used</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleTechRemove(tech)}
                        className="text-purple-300 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add technology and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTechAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
                >
                  {editingExperience ? 'Update Experience' : 'Create Experience'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingExperience(null);
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

      {/* Experience Timeline */}
      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-purple-300 text-lg">No experience entries found. Add your first experience!</p>
          </div>
        ) : (
          experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 relative"
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-purple-500/30 transform -translate-x-1/2"></div>
              )}
              
              {/* Timeline Dot */}
              <div className="absolute left-8 top-8 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2 border-4 border-black"></div>
              
              <div className="ml-16">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                      {experience.current && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-purple-300 text-lg mb-2">{experience.company}</p>
                    {experience.location && (
                      <p className="text-purple-400 text-sm mb-3">{experience.location}</p>
                    )}
                    <p className="text-purple-300 mb-4">{experience.description}</p>
                    
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-sm text-purple-400">
                      {formatDate(experience.startDate)} - {
                        experience.current ? 'Present' : formatDate(experience.endDate!)
                      }
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(experience)}
                      className="p-2 text-purple-300 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}