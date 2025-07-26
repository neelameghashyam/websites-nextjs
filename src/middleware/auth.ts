// pricing-api/app/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function auth(req: NextRequest) {
  const apiKey = req.headers.get('X-API-Key');
  const authHeader = req.headers.get('Authorization');
  const jwtSecret = process.env.JWT_SECRET;

  // Check API Key
  if (apiKey && apiKey === process.env.API_KEY) {
    return NextResponse.next();
  }

  // Check JWT Bearer token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, jwtSecret as string);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}