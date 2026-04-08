"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUniversity = exports.createUniversity = void 0;
const createUniversity = (data) => {
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
exports.createUniversity = createUniversity;
const validateUniversity = (university) => {
    if (!university || typeof university !== 'object')
        return false;
    const u = university;
    return (typeof u.name === 'string' &&
        typeof u.country === 'string' &&
        typeof u.ranking === 'number');
};
exports.validateUniversity = validateUniversity;
//# sourceMappingURL=University.js.map