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
export declare const createUniversity: (data: Partial<University>) => University;
export declare const validateUniversity: (university: unknown) => university is University;
//# sourceMappingURL=University.d.ts.map