import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://outvier_admin:uCyxXjjGrgnfzNVA@outvieredtech.acjyafu.mongodb.net/outvier?appName=OutvierEdTech';

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  if (isConnected) return true;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
};

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

export interface UniversityDoc {
  _id?: mongoose.Types.ObjectId;
  id?: string;
  name: string;
  country: string;
  city: string;
  region: string;
  ranking: number;
  rankingTier: 'top' | 'mid' | 'low';
  tuition: {
    domestic: number;
    international: number;
  };
  hiddenCosts: {
    living: number;
    visa: number;
    insurance: number;
  };
  employment: {
    rate: number;
    avgSalary: number;
    currency: string;
  };
  scholarships: {
    available: boolean;
    types: string[];
  };
  lastVerified: string;
  isEstimated: boolean;
  fieldOfStudy?: string;
}

const HiddenCostSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
}, { _id: false });

const ScholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  deadline: { type: String, required: true },
}, { _id: false });

const UniversitySchema = new mongoose.Schema({
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

const UniversityModel = mongoose.models.University || mongoose.model('University', UniversitySchema);

export const getUniversities = async (): Promise<UniversityDoc[]> => {
  try {
    const unis = await UniversityModel.find({}).limit(100).lean();
    return unis.map((uni: Record<string, unknown>) => ({
      _id: uni._id as mongoose.Types.ObjectId | undefined,
      id: uni._id?.toString(),
      name: uni.name as string,
      country: uni.country as string,
      city: uni.city as string,
      region: uni.country as string,
      ranking: uni.ranking as number,
      rankingTier: (uni.ranking as number) <= 10 ? 'top' : (uni.ranking as number) <= 50 ? 'mid' : 'low' as const,
      tuition: {
        domestic: uni.tuition as number,
        international: uni.tuition as number,
      },
      hiddenCosts: {
        living: 0,
        visa: 0,
        insurance: 0,
      },
      employment: {
        rate: uni.employmentRate as number,
        avgSalary: Math.round((uni.employmentRate as number) * 500),
        currency: 'USD',
      },
      scholarships: {
        available: !!(uni.scholarships as unknown[])?.length,
        types: (uni.scholarships as IScholarship[] | undefined)?.map(s => s.name) || [],
      },
      lastVerified: new Date().toISOString(),
      isEstimated: !(uni.isVerified as boolean),
      fieldOfStudy: undefined,
    }));
  } catch (error) {
    console.error('Error fetching universities:', error);
    return [];
  }
};