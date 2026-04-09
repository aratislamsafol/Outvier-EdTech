import { useMutation } from '@tanstack/react-query';
import { StudentProfile } from '@/components/ProfileForm';

export interface Recommendation {
  university: {
    id: string;
    name: string;
    country: string;
    city: string;
    ranking: number;
    tuition: number;
    employmentRate: number;
    visaPathway: string;
    isVerified: boolean;
    scholarships: {
      available: boolean;
      types: string[];
    };
  };
  fitScore: number;
  budgetScore: number;
  academicScore: number;
  scholarshipEligible: boolean;
  roiYears: number;
  matchReason: string;
}

export interface RecommendationsResponse {
  success: boolean;
  data: {
    recommendations: Recommendation[];
    totalMatches: number;
    processingTimeMs: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchRecommendations(profile: StudentProfile): Promise<RecommendationsResponse> {
  const response = await fetch(`${API_URL}/api/recommendations/match`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
}

export function useRecommendations() {
  return useMutation({
    mutationFn: fetchRecommendations,
    retry: 1,
  });
}