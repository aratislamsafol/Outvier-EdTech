"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Recommendations API' });
});
router.post('/match', (req, res) => {
    res.json({ message: 'Match universities to profile' });
});
exports.default = router;
//# sourceMappingURL=recommendations.js.map