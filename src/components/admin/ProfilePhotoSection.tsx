'use client';

import { useState, useEffect, useRef } from 'react';

interface ProfileData {
  profileImage: string;
  updatedAt: string;
}

export default function ProfilePhotoSection() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await fetch('/api/admin/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadProfilePhoto(file);
    }
  };

  const uploadProfilePhoto = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Upload the image file
      const formData = new FormData();
      formData.append('file', file);
      
      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      
      // Update profile with new image path
      const updateResponse = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileImage: uploadResult.url,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await updateResponse.json();
      setProfileData(result.profile);
      alert('Profile photo updated successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload profile photo. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleResetToDefault = async () => {
    if (!confirm('Reset to default profile photo?')) {
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileImage: '/project-images/1758475845776.jpg',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setProfileData(result.profile);
        alert('Profile photo reset to default!');
      } else {
        throw new Error('Failed to reset profile photo');
      }
    } catch (error) {
      console.error('Reset error:', error);
      alert('Failed to reset profile photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Profile Photo</h2>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Profile Photo</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Current Photo Display */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full border-4 border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-lg overflow-hidden">
            {profileData?.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/project-images/1758475845776.jpg'; // fallback
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-purple-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
          {profileData?.updatedAt && (
            <p className="text-xs text-purple-400 mt-2 text-center">
              Updated: {new Date(profileData.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-purple-300 mb-4">
              This photo appears in your portfolio's hero section. Upload a square image for best results.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleUploadClick}
                disabled={isUploading}
                className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload New Photo
                  </>
                )}
              </button>

              <button
                onClick={handleResetToDefault}
                disabled={isUploading}
                className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset to Default
              </button>
            </div>
          </div>

          <div className="text-sm text-purple-400">
            <p><strong>Tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Use a square image (1:1 ratio) for best results</li>
              <li>Recommended size: 400x400 pixels or larger</li>
              <li>Supported formats: JPG, PNG, WebP</li>
              <li>Maximum file size: 5MB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
}