import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const profileData = readProfileData();
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json({
      profileImage: '/project-images/1758475845776.jpg',
      updatedAt: new Date().toISOString(),
    });
  }
}