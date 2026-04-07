import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    data: [],
    message: 'University API - GET all (to be implemented)'
  });
}

export async function POST() {
  return NextResponse.json({
    message: 'University API - POST (to be implemented)'
  });
}