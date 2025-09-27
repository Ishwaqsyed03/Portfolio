import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const PROFILE_DATA_FILE = path.join(process.cwd(), 'src/data/profile.json');

interface ProfileData {
  profileImage: string;
  updatedAt: string;
}

function readProfileData(): ProfileData {
  try {
    if (!fs.existsSync(PROFILE_DATA_FILE)) {
      return {
        profileImage: '/project-images/1758475845776.jpg', // default image
        updatedAt: new Date().toISOString(),
      };
    }
    const data = fs.readFileSync(PROFILE_DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading profile data:', error);
    return {
      profileImage: '/project-images/1758475845776.jpg',
      updatedAt: new Date().toISOString(),
    };
  }
}

function writeProfileData(profileData: ProfileData): void {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(PROFILE_DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(PROFILE_DATA_FILE, JSON.stringify(profileData, null, 2));
  } catch (error) {
    console.error('Error writing profile data:', error);
    throw new Error('Failed to save profile data');
  }
}

export async function GET() {
  try {
    const profileData = readProfileData();
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('GET /api/admin/profile error:', error);
    return NextResponse.json(
      { error: 'Failed to load profile data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { profileImage } = body;

    if (!profileImage) {
      return NextResponse.json(
        { error: 'Profile image is required' },
        { status: 400 }
      );
    }

    const profileData: ProfileData = {
      profileImage,
      updatedAt: new Date().toISOString(),
    };

    writeProfileData(profileData);

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: profileData
    });
  } catch (error) {
    console.error('PUT /api/admin/profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}