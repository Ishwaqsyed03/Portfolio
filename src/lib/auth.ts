import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function createAuthResponse(message: string, status: number = 401) {
  return NextResponse.json({ error: message }, { status });
}