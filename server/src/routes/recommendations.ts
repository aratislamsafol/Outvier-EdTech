import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Recommendations API' });
});

router.post('/match', (req, res) => {
  res.json({ message: 'Match universities to profile' });
});

export default router;