"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.University = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HiddenCostSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
}, { _id: false });
const ScholarshipSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    deadline: { type: String, required: true },
}, { _id: false });
const UniversitySchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    city: { type: String, required: true },
    ranking: { type: Number, required: true, index: true },
    tuition: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    scholarships: [ScholarshipSchema],
    employmentRate: { type: Number, required: true },
    visaPathway: { type: String, required: true },
    hiddenCosts: [HiddenCostSchema],
    auditTimestamp: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.University = mongoose_1.default.models.University || mongoose_1.default.model('University', UniversitySchema);
//# sourceMappingURL=University.js.map