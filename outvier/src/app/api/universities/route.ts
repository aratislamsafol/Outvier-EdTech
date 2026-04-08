import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function isValidNumber(value: string | null): boolean {
  if (!value) return true;
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= 0;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const budgetMin = searchParams.get('budgetMin');
    const budgetMax = searchParams.get('budgetMax');
    const country = searchParams.get('country');
    const rankingTier = searchParams.get('rankingTier');

    // Validate numeric inputs
    if (!isValidNumber(budgetMin) || !isValidNumber(budgetMax)) {
      return NextResponse.json(
        { error: 'Invalid filter parameters' },
        { status: 400 }
      );
    }

    // Build query string for backend
    const params = new URLSearchParams();
    if (budgetMin) params.set('budgetMin', budgetMin);
    if (budgetMax) params.set('budgetMax', budgetMax);
    if (country && country !== 'all') params.set('country', country);
    if (rankingTier && rankingTier !== 'all') params.set('rankingTier', rankingTier);

    // Call backend API instead of direct DB access
    const response = await fetch(`${API_BASE_URL}/api/universities?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    );
  }
}