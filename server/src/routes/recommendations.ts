import { Router } from 'express';
import { getUniversities } from '../infrastructure/persistence/mongodb/connection.js';
import { matchUniversities } from '../application/services/MatchingService.js';
import { StudentProfileDTO } from '../application/dto/index.js';

const router = Router();

interface MatchRequestBody {
  profile: StudentProfileDTO;
}

router.post('/match', async (req, res) => {
  try {
    const { profile } = req.body as MatchRequestBody;

    if (!profile || !profile.gpa || !profile.fieldOfStudy) {
      res.status(400).json({ error: 'Invalid profile data' });
      return;
    }

    const universities = await getUniversities();
    
    if (!universities || universities.length === 0) {
      res.status(404).json({ error: 'No universities found' });
      return;
    }

    const universityDTOs = universities.map(uni => ({
      id: uni._id?.toString() || uni.id || 'unknown',
      name: uni.name,
      country: uni.country,
      region: uni.region,
      ranking: uni.ranking,
      rankingTier: uni.rankingTier,
      tuition: {
        domestic: uni.tuition?.domestic || 0,
        international: uni.tuition?.international || 0,
      },
      hiddenCosts: {
        living: uni.hiddenCosts?.living || 0,
        visa: uni.hiddenCosts?.visa || 0,
        insurance: uni.hiddenCosts?.insurance || 0,
      },
      employment: {
        rate: uni.employment?.rate || 0,
        avgSalary: uni.employment?.avgSalary || 0,
      },
      scholarships: {
        available: uni.scholarships?.available || false,
        types: uni.scholarships?.types || [],
      },
      lastVerified: uni.lastVerified,
      isEstimated: uni.isEstimated,
      fieldOfStudy: uni.fieldOfStudy,
    }));

    const result = matchUniversities({
      profile: {
        gpa: Number(profile.gpa),
        fieldOfStudy: profile.fieldOfStudy,
        budgetMin: Number(profile.budgetMin) || 0,
        budgetMax: Number(profile.budgetMax) || 100000,
      },
      universities: universityDTOs,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;