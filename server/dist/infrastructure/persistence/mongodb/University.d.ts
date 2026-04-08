import mongoose, { Document } from 'mongoose';
export interface IHiddenCost {
    category: string;
    amount: number;
    currency: string;
}
export interface IScholarship {
    name: string;
    percentage: number;
    deadline: string;
}
export interface IUniversity extends Document {
    name: string;
    country: string;
    city: string;
    ranking: number;
    tuition: number;
    currency: string;
    scholarships: IScholarship[];
    employmentRate: number;
    visaPathway: string;
    hiddenCosts: IHiddenCost[];
    createdAt: Date;
    updatedAt: Date;
    auditTimestamp: Date;
    isVerified: boolean;
}
export declare const University: mongoose.Model<any, {}, {}, {}, any, any>;
//# sourceMappingURL=University.d.ts.map