import { Router } from 'express';
import { connectDB } from '../infrastructure/persistence/mongodb/connection.js';
import { University } from '../infrastructure/persistence/mongodb/University.js';

const router = Router();

interface Filter {
  tuition?: { $gte?: number; $lte?: number };
  country?: string;
  ranking?: { $lte: number };
}

router.get('/', async (req, res) => {
  try {
    const { budgetMin, budgetMax, country, rankingTier } = req.query as Record<string, string>;

    const filter: Filter = {};

    // Budget filter
    if (budgetMin || budgetMax) {
      filter.tuition = {};
      if (budgetMin) {
        filter.tuition.$gte = Number(budgetMin);
      }
      if (budgetMax) {
        filter.tuition.$lte = Number(budgetMax);
      }
    }

    // Country filter
    if (country && country !== 'all') {
      filter.country = country;
    }

    // Ranking tier filter
    if (rankingTier && rankingTier !== 'all') {
      const tiers: Record<string, number> = {
        'top-10': 10,
        'top-25': 25,
        'top-50': 50,
        'top-100': 100,
      };
      const maxRanking = tiers[rankingTier];
      if (maxRanking) {
        filter.ranking = { $lte: maxRanking };
      }
    }

    await connectDB();

    const universities = await University.find(filter)
      .select('name country city ranking tuition currency employmentRate visaPathway isVerified')
      .sort({ ranking: 1 })
      .limit(50);

    res.json({
      data: universities,
      count: universities.length,
      filters: { budgetMin, budgetMax, country, rankingTier },
    });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await connectDB();
    const university = await University.findById(id);
    
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    
    res.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ error: 'Failed to fetch university' });
  }
});

export default router;