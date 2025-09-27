import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  const testPassword = 'admin123';
  const hash = '$2b$12$DKUAOtDU.SKgTOitZGt4VugoPOh18ereS4Z2VH5qvKVb7.HPFdL2G';
  
  const isValid = await bcrypt.compare(testPassword, hash);
  
  return NextResponse.json({
    password: testPassword,
    hash: hash,
    isValid: isValid,
    message: isValid ? 'Password hash is correct' : 'Password hash is incorrect'
  });
}