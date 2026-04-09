export interface StudentProfileDTO {
  gpa: number;
  fieldOfStudy: string;
  budgetMin: number;
  budgetMax: number;
}

export interface UniversityDTO {
  id: string;
  name: string;
  country: string;
  region: string;
  ranking: number;
  rankingTier: 'top' | 'mid' | 'low';
  tuition: {
    domestic: number;
    international: number;
  };
  hiddenCosts: {
    living: number;
    visa: number;
    insurance: number;
  };
  employment: {
    rate: number;
    avgSalary: number;
  };
  scholarships: {
    available: boolean;
    types: string[];
  };
  lastVerified: string;
  isEstimated: boolean;
  fieldOfStudy?: string;
}

export interface RecommendationResult {
  university: UniversityDTO;
  fitScore: number;
  budgetScore: number;
  academicScore: number;
  scholarshipEligible: boolean;
  roiYears: number;
  matchReason: string;
}