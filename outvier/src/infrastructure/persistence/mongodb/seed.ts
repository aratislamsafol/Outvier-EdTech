import { config } from 'dotenv';
config({ path: '.env.local' });
import mongoose from 'mongoose';
import { University, IUniversity } from './University';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/outvier';
console.log('Using MongoDB URI:', MONGODB_URI);


const sampleUniversities: Partial<IUniversity>[] = [
  {
    name: 'Massachusetts Institute of Technology',
    country: 'USA',
    city: 'Cambridge',
    ranking: 1,
    tuition: 57986,
    currency: 'USD',
    scholarships: [
      { name: 'MIT Scholarships', percentage: 100, deadline: '2024-01-01' },
    ],
    employmentRate: 95,
    visaPathway: 'OPT',
    hiddenCosts: [
      { category: 'Living', amount: 18000, currency: 'USD' },
      { category: 'Health Insurance', amount: 4000, currency: 'USD' },
      { category: 'Books', amount: 2000, currency: 'USD' },
    ],
    isVerified: true,
  },
  {
    name: 'Stanford University',
    country: 'USA',
    city: 'Stanford',
    ranking: 2,
    tuition: 56169,
    currency: 'USD',
    scholarships: [
      { name: 'Stanford Financial Aid', percentage: 100, deadline: '2024-01-02' },
    ],
    employmentRate: 94,
    visaPathway: 'OPT',
    hiddenCosts: [
      { category: 'Living', amount: 19500, currency: 'USD' },
      { category: 'Health Insurance', amount: 4500, currency: 'USD' },
      { category: 'Books', amount: 1800, currency: 'USD' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Oxford',
    country: 'UK',
    city: 'Oxford',
    ranking: 3,
    tuition: 38710,
    currency: 'GBP',
    scholarships: [
      { name: 'Oxford Clarendon', percentage: 100, deadline: '2024-01-10' },
    ],
    employmentRate: 92,
    visaPathway: 'PSW',
    hiddenCosts: [
      { category: 'Living', amount: 15000, currency: 'GBP' },
      { category: 'Health Insurance (IHS)', amount: 4700, currency: 'GBP' },
      { category: 'Books', amount: 800, currency: 'GBP' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Cambridge',
    country: 'UK',
    city: 'Cambridge',
    ranking: 4,
    tuition: 39912,
    currency: 'GBP',
    scholarships: [
      { name: 'Cambridge Gates', percentage: 100, deadline: '2024-01-15' },
    ],
    employmentRate: 93,
    visaPathway: 'PSW',
    hiddenCosts: [
      { category: 'Living', amount: 16000, currency: 'GBP' },
      { category: 'Health Insurance (IHS)', amount: 4700, currency: 'GBP' },
      { category: 'Books', amount: 750, currency: 'GBP' },
    ],
    isVerified: true,
  },
  {
    name: 'ETH Zurich',
    country: 'Switzerland',
    city: 'Zurich',
    ranking: 5,
    tuition: 730,
    currency: 'CHF',
    scholarships: [
      { name: 'ETH Excellence', percentage: 100, deadline: '2024-04-15' },
    ],
    employmentRate: 96,
    visaPathway: 'Work Permit',
    hiddenCosts: [
      { category: 'Living', amount: 18000, currency: 'CHF' },
      { category: 'Health Insurance', amount: 3600, currency: 'CHF' },
      { category: 'Books', amount: 600, currency: 'CHF' },
    ],
    isVerified: true,
  },
  {
    name: 'Imperial College London',
    country: 'UK',
    city: 'London',
    ranking: 6,
    tuition: 35000,
    currency: 'GBP',
    scholarships: [
      { name: "Imperial President's", percentage: 50, deadline: '2024-01-28' },
    ],
    employmentRate: 91,
    visaPathway: 'PSW',
    hiddenCosts: [
      { category: 'Living', amount: 20000, currency: 'GBP' },
      { category: 'Health Insurance (IHS)', amount: 4700, currency: 'GBP' },
      { category: 'Books', amount: 900, currency: 'GBP' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Chicago',
    country: 'USA',
    city: 'Chicago',
    ranking: 7,
    tuition: 63000,
    currency: 'USD',
    scholarships: [
      { name: 'UChicago Aid', percentage: 100, deadline: '2024-01-05' },
    ],
    employmentRate: 90,
    visaPathway: 'OPT',
    hiddenCosts: [
      { category: 'Living', amount: 17000, currency: 'USD' },
      { category: 'Health Insurance', amount: 3500, currency: 'USD' },
      { category: 'Books', amount: 1600, currency: 'USD' },
    ],
    isVerified: true,
  },
  {
    name: 'National University of Singapore',
    country: 'Singapore',
    city: 'Singapore',
    ranking: 8,
    tuition: 18500,
    currency: 'SGD',
    scholarships: [
      { name: 'NUS Global Merit', percentage: 100, deadline: '2024-02-28' },
    ],
    employmentRate: 88,
    visaPathway: 'EP',
    hiddenCosts: [
      { category: 'Living', amount: 12000, currency: 'SGD' },
      { category: 'Health Insurance', amount: 1500, currency: 'SGD' },
      { category: 'Books', amount: 800, currency: 'SGD' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Pennsylvania',
    country: 'USA',
    city: 'Philadelphia',
    ranking: 9,
    tuition: 56620,
    currency: 'USD',
    scholarships: [
      { name: 'Penn Financial Aid', percentage: 100, deadline: '2024-01-15' },
    ],
    employmentRate: 91,
    visaPathway: 'OPT',
    hiddenCosts: [
      { category: 'Living', amount: 16500, currency: 'USD' },
      { category: 'Health Insurance', amount: 3200, currency: 'USD' },
      { category: 'Books', amount: 1400, currency: 'USD' },
    ],
    isVerified: true,
  },
  {
    name: 'Tsinghua University',
    country: 'China',
    city: 'Beijing',
    ranking: 10,
    tuition: 6000,
    currency: 'USD',
    scholarships: [
      { name: 'Tsinghua International', percentage: 100, deadline: '2024-03-01' },
    ],
    employmentRate: 85,
    visaPathway: 'Work Permit',
    hiddenCosts: [
      { category: 'Living', amount: 4000, currency: 'USD' },
      { category: 'Health Insurance', amount: 500, currency: 'USD' },
      { category: 'Books', amount: 400, currency: 'USD' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    city: 'Toronto',
    ranking: 18,
    tuition: 45000,
    currency: 'CAD',
    scholarships: [
      { name: 'U of T Scholars', percentage: 100, deadline: '2024-01-15' },
    ],
    employmentRate: 89,
    visaPathway: 'PGWP',
    hiddenCosts: [
      { category: 'Living', amount: 16000, currency: 'CAD' },
      { category: 'Health Insurance', amount: 2400, currency: 'CAD' },
      { category: 'Books', amount: 1200, currency: 'CAD' },
    ],
    isVerified: true,
  },
  {
    name: 'University of British Columbia',
    country: 'Canada',
    city: 'Vancouver',
    ranking: 21,
    tuition: 42000,
    currency: 'CAD',
    scholarships: [
      { name: 'UBC International', percentage: 75, deadline: '2024-02-01' },
    ],
    employmentRate: 87,
    visaPathway: 'PGWP',
    hiddenCosts: [
      { category: 'Living', amount: 15000, currency: 'CAD' },
      { category: 'Health Insurance', amount: 2200, currency: 'CAD' },
      { category: 'Books', amount: 1000, currency: 'CAD' },
    ],
    isVerified: true,
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    ranking: 22,
    tuition: 150,
    currency: 'EUR',
    scholarships: [
      { name: 'DAAD', percentage: 100, deadline: '2024-04-01' },
    ],
    employmentRate: 94,
    visaPathway: '18-month',
    hiddenCosts: [
      { category: 'Living', amount: 12000, currency: 'EUR' },
      { category: 'Health Insurance', amount: 1200, currency: 'EUR' },
      { category: 'Books', amount: 400, currency: 'EUR' },
    ],
    isVerified: true,
  },
  {
    name: 'Karolinska Institute',
    country: 'Sweden',
    city: 'Stockholm',
    ranking: 25,
    tuition: 20000,
    currency: 'SEK',
    scholarships: [
      { name: 'Karolinska Global', percentage: 100, deadline: '2024-01-15' },
    ],
    employmentRate: 90,
    visaPathway: 'PGWP',
    hiddenCosts: [
      { category: 'Living', amount: 10000, currency: 'SEK' },
      { category: 'Health Insurance', amount: 1500, currency: 'SEK' },
      { category: 'Books', amount: 500, currency: 'SEK' },
    ],
    isVerified: true,
  },
  {
    name: 'University of Melbourne',
    country: 'Australia',
    city: 'Melbourne',
    ranking: 14,
    tuition: 48000,
    currency: 'AUD',
    scholarships: [
      { name: 'Melbourne International', percentage: 50, deadline: '2024-04-30' },
    ],
    employmentRate: 86,
    visaPathway: 'PSW',
    hiddenCosts: [
      { category: 'Living', amount: 20000, currency: 'AUD' },
      { category: 'Health Insurance', amount: 3000, currency: 'AUD' },
      { category: 'Books', amount: 800, currency: 'AUD' },
    ],
    isVerified: true,
  },
];

async function seedUniversities() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing universities...');
    await University.deleteMany({});
    console.log('Cleared existing data');

    console.log('Seeding universities...');
    const universities = await University.insertMany(sampleUniversities);
    console.log(`Seeded ${universities.length} universities successfully!`);

    console.log('\nSeeded Universities:');
    universities.forEach((uni, index) => {
      console.log(`${index + 1}. ${uni.name} (${uni.country}) - Rank #${uni.ranking}`);
    });

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding universities:', error);
    process.exit(1);
  }
}

seedUniversities();