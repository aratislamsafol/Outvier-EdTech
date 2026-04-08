import mongoose, { Schema, Document } from 'mongoose';

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

const HiddenCostSchema = new Schema<IHiddenCost>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
}, { _id: false });

const ScholarshipSchema = new Schema<IScholarship>({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  deadline: { type: String, required: true },
}, { _id: false });

const UniversitySchema = new Schema<IUniversity>({
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

export const University = mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);