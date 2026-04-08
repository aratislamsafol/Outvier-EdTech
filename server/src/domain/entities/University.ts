export interface University {
  id: string;
  name: string;
  country: string;
  region: string;
  ranking: number;
  rankingTier: 'top' | 'mid' | 'low';
  tuition: {
    domestic: number;
    international: number;
    currency: string;
  };
  hiddenCosts: {
    living: number;
    visa: number;
    insurance: number;
  };
  employment: {
    rate: number;
    avgSalary: number;
    currency: string;
  };
  scholarships: {
    available: boolean;
    types: string[];
  };
  lastVerified: string;
  isEstimated: boolean;
}

export const createUniversity = (data: Partial<University>): University => {
  const now = new Date().toISOString();
  return {
    id: data.id || crypto.randomUUID(),
    name: data.name || '',
    country: data.country || '',
    region: data.region || '',
    ranking: data.ranking || 0,
    rankingTier: data.rankingTier || 'mid',
    tuition: data.tuition || { domestic: 0, international: 0, currency: 'USD' },
    hiddenCosts: data.hiddenCosts || { living: 0, visa: 0, insurance: 0 },
    employment: data.employment || { rate: 0, avgSalary: 0, currency: 'USD' },
    scholarships: data.scholarships || { available: false, types: [] },
    lastVerified: data.lastVerified || now,
    isEstimated: data.isEstimated || false,
  };
};

export const validateUniversity = (university: unknown): university is University => {
  if (!university || typeof university !== 'object') return false;
  const u = university as Record<string, unknown>;
  return (
    typeof u.name === 'string' &&
    typeof u.country === 'string' &&
    typeof u.ranking === 'number'
  );
};