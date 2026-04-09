import { useQuery } from '@tanstack/react-query';

export interface University {
  _id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  tuition: number;
  currency: string;
  employmentRate: number;
  visaPathway: string;
  isVerified: boolean;
}

export interface UniversityFilters {
  budgetMin?: number;
  budgetMax?: number;
  country?: string;
  rankingTier?: string;
}

interface UniversitiesResponse {
  data: University[];
  count: number;
  filters: UniversityFilters;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchUniversities(filters: UniversityFilters = {}): Promise<UniversitiesResponse> {
  const params = new URLSearchParams();
  
  if (filters.budgetMin != null) {
    params.set('budgetMin', String(filters.budgetMin));
  }
  if (filters.budgetMax != null) {
    params.set('budgetMax', String(filters.budgetMax));
  }
  if (filters.country && filters.country !== 'all') {
    params.set('country', filters.country);
  }
  if (filters.rankingTier && filters.rankingTier !== 'all') {
    params.set('rankingTier', filters.rankingTier);
  }

  const response = await fetch(`${API_URL}/api/universities?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch universities');
  }
  
  return response.json();
}

export function useUniversities(filters: UniversityFilters = {}) {
  return useQuery({
    queryKey: ['universities', filters],
    queryFn: () => fetchUniversities(filters),
    staleTime: 60 * 1000,
  });
}