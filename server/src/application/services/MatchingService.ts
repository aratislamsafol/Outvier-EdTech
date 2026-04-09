import { StudentProfileDTO, UniversityDTO, RecommendationResult } from '../dto';

export interface MatchingAlgorithmInput {
  profile: StudentProfileDTO;
  universities: UniversityDTO[];
}

export interface MatchingAlgorithmOutput {
  recommendations: RecommendationResult[];
  totalMatches: number;
  processingTimeMs: number;
}

const FIELD_OF_STUDY_MAPPING: Record<string, string[]> = {
  'Computer Science': ['Computer Science', 'Software Engineering', 'Data Science', 'AI', 'Information Systems'],
  'Engineering': ['Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering'],
  'Business': ['Business', 'MBA', 'Finance', 'Marketing', 'Management', 'Economics'],
  'Medicine': ['Medicine', 'Health', 'Nursing', 'Pharmacy', 'Biomedical'],
  'Arts': ['Arts', 'Design', 'Music', 'Fashion', 'Media', 'Communication'],
  'Sciences': ['Sciences', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science'],
  'Law': ['Law', 'Legal Studies', 'Criminology'],
  'Other': [],
};

const isFieldMatching = (universityField: string | undefined, studentField: string): boolean => {
  if (!universityField) return true;
  const matchingFields = FIELD_OF_STUDY_MAPPING[studentField] || [];
  return matchingFields.some(f => universityField.toLowerCase().includes(f.toLowerCase()));
};

const calculateBudgetScore = (tuition: number, budgetMin: number, budgetMax: number): number => {
  if (budgetMax === 0) return 0;
  if (tuition < budgetMin) {
    const savings = budgetMin - tuition;
    const maxSavings = budgetMin;
    return Math.round(50 + (savings / maxSavings) * 50);
  }
  if (tuition > budgetMax) return 0;
  const ratio = (budgetMax - tuition) / budgetMax;
  return Math.round(50 + ratio * 50);
};

const calculateAcademicScore = (gpa: number, ranking: number): number => {
  const gpaScore = Math.min(100, gpa * 25);
  const rankingScore = Math.max(0, 100 - ranking);
  return Math.round((gpaScore * 0.6) + (rankingScore * 0.4));
};

const calculateROI = (totalCost: number, avgSalary: number): number => {
  if (avgSalary <= 0) return 0;
  return Math.round(totalCost / avgSalary * 10) / 10;
};

export const matchUniversities = (input: MatchingAlgorithmInput): MatchingAlgorithmOutput => {
  const startTime = Date.now();
  const { profile, universities } = input;
  
  const recommendations: RecommendationResult[] = [];

  for (const uni of universities) {
    const tuition = uni.tuition.international || uni.tuition.domestic || 0;
    const budgetScore = calculateBudgetScore(tuition, profile.budgetMin, profile.budgetMax);
    const academicScore = calculateAcademicScore(profile.gpa, uni.ranking);
    const fieldMatch = isFieldMatching(uni.fieldOfStudy, profile.fieldOfStudy);
    
    const fieldBonus = fieldMatch ? 10 : 0;
    const scholarshipBonus = uni.scholarships?.available ? 15 : 0;
    const fitScore = Math.min(100, Math.round(
      (budgetScore * 0.4) + 
      (academicScore * 0.4) + 
      fieldBonus +
      scholarshipBonus
    ));

    const totalCost = tuition + (uni.hiddenCosts?.living || 0) + (uni.hiddenCosts?.visa || 0) + (uni.hiddenCosts?.insurance || 0);
    const roiYears = calculateROI(totalCost, uni.employment?.avgSalary || 0);

    const matchReasons: string[] = [];
    if (budgetScore >= 80) matchReasons.push('Within budget');
    if (academicScore >= 70) matchReasons.push('Academic fit');
    if (fieldMatch) matchReasons.push('Field of study match');
    if (uni.scholarships?.available) matchReasons.push('Scholarships available');

    recommendations.push({
      university: uni,
      fitScore,
      budgetScore,
      academicScore,
      scholarshipEligible: uni.scholarships?.available || false,
      roiYears,
      matchReason: matchReasons.join(', ') || 'Basic match',
    });
  }

  recommendations.sort((a, b) => b.fitScore - a.fitScore);

  const processingTimeMs = Date.now() - startTime;

  return {
    recommendations,
    totalMatches: recommendations.length,
    processingTimeMs,
  };
};