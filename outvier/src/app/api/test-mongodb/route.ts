import { connectDB } from '@/infrastructure/persistence/mongodb/connection';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'MongoDB connected successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'MongoDB connection failed', details: String(error) },
      { status: 500 }
    );
  }
}