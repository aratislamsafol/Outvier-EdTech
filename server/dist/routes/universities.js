"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_js_1 = require("../infrastructure/persistence/mongodb/connection.js");
const University_js_1 = require("../infrastructure/persistence/mongodb/University.js");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const { budgetMin, budgetMax, country, rankingTier } = req.query;
        const filter = {};
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
            const tiers = {
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
        await (0, connection_js_1.connectDB)();
        const universities = await University_js_1.University.find(filter)
            .select('name country city ranking tuition currency employmentRate visaPathway isVerified')
            .sort({ ranking: 1 })
            .limit(50);
        res.json({
            data: universities,
            count: universities.length,
            filters: { budgetMin, budgetMax, country, rankingTier },
        });
    }
    catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({ error: 'Failed to fetch universities' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await (0, connection_js_1.connectDB)();
        const university = await University_js_1.University.findById(id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.json(university);
    }
    catch (error) {
        console.error('Error fetching university:', error);
        res.status(500).json({ error: 'Failed to fetch university' });
    }
});
exports.default = router;
//# sourceMappingURL=universities.js.map