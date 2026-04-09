'use client';

import { useState, useMemo } from 'react';
import { useUniversities, type University, type UniversityFilters } from '@/hooks/useUniversities';
import { useRecommendations, type Recommendation } from '@/hooks/useRecommendations';
import { ProfileForm, type StudentProfile } from './ProfileForm';
import { ComparisonCharts } from './ComparisonCharts';

const MAX_COMPARISON = 5;

export function Dashboard() {
  const [budgetMin, setBudgetMin] = useState<string>('');
  const [budgetMax, setBudgetMax] = useState<string>('');
  const [country, setCountry] = useState('all');
  const [rankingTier, setRankingTier] = useState('all');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const filters = useMemo((): UniversityFilters => {
    const f: UniversityFilters = {};
    const minVal = budgetMin ? Number(budgetMin) : 0;
    const maxVal = budgetMax ? Number(budgetMax) : 100000;
    if (minVal > 0) f.budgetMin = minVal;
    if (maxVal < 100000) f.budgetMax = maxVal;
    if (country !== 'all') f.country = country;
    if (rankingTier !== 'all') f.rankingTier = rankingTier;
    return f;
  }, [budgetMin, budgetMax, country, rankingTier]);

  const { data, isLoading, error } = useUniversities(filters);
  const recommendationsMutation = useRecommendations();

  const handleProfileSubmit = async (profile: StudentProfile) => {
    setStudentProfile(profile);
    setShowProfileForm(false);
    try {
      const result = await recommendationsMutation.mutateAsync(profile);
      if (result.data?.recommendations) {
        setRecommendations(result.data.recommendations);
      }
    } catch (err) {
      console.error('Failed to get recommendations:', err);
    }
  };

  const handleBudgetChange = (min: string, max: string) => {
    setBudgetMin(min);
    setBudgetMax(max);
  };

  const clearFilters = () => {
    setBudgetMin('');
    setBudgetMax('');
    setCountry('all');
    setRankingTier('all');
  };

  const toggleUniversitySelection = (id: string) => {
    setSelectedUniversities(prev => {
      if (prev.includes(id)) {
        return prev.filter(uid => uid !== id);
      }
      if (prev.length >= MAX_COMPARISON) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleCompareClick = () => {
    if (selectedUniversities.length >= 2) {
      setShowCompareModal(true);
    }
  };

  const selectedUniversityData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter(uni => selectedUniversities.includes(uni._id));
  }, [data, selectedUniversities]);

  const countries = ['USA', 'UK', 'Canada', 'Germany', 'Australia', 'Singapore', 'China', 'Switzerland', 'Sweden'];
  const rankingTiers = [
    { value: 'all', label: 'All Rankings' },
    { value: 'top-10', label: 'Top 10' },
    { value: 'top-25', label: 'Top 25' },
    { value: 'top-50', label: 'Top 50' },
    { value: 'top-100', label: 'Top 100' },
  ];

  const hasActiveFilters = (budgetMin !== '' && Number(budgetMin) > 0) || (budgetMax !== '' && Number(budgetMax) < 100000) || country !== 'all' || rankingTier !== 'all';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                University Discovery
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Find your perfect university
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* AI Recommendations Button */}
              <button
                onClick={() => setShowProfileForm(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="hidden sm:inline">AI Recommendations</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:sticky lg:top-24">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="font-semibold text-slate-800">All Filters</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="p-4 space-y-5">
                {/* Budget Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Budget Range
                  </label>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-emerald-600 font-medium mb-1 block">Min Budget</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 text-sm font-medium">$</span>
                        <input
                          type="number"
                          value={budgetMin}
                          onChange={(e) => handleBudgetChange(e.target.value, budgetMax)}
                          className="w-full pl-7 pr-3 py-2 text-sm border-2 border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/50"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-rose-600 font-medium mb-1 block">Max Budget</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 text-sm font-medium">$</span>
                        <input
                          type="number"
                          value={budgetMax}
                          onChange={(e) => handleBudgetChange(budgetMin, e.target.value)}
                          className="w-full pl-7 pr-3 py-2 text-sm border-2 border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/50"
                          placeholder="100000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gradient-to-r from-slate-50 to-indigo-50"
                  >
                    <option value="all" className="bg-slate-50">All Countries</option>
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-white text-slate-700 hover:bg-indigo-50">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Ranking Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Ranking
                  </label>
                  <select
                    value={rankingTier}
                    onChange={(e) => setRankingTier(e.target.value)}
                    className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gradient-to-r from-slate-50 to-indigo-50"
                  >
                    {rankingTiers.map((tier) => (
                      <option key={tier.value} value={tier.value} className="bg-white text-slate-700 hover:bg-indigo-50">{tier.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
                  <div className="flex flex-wrap gap-2">
                    {budgetMin !== '' && Number(budgetMin) > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-md">
                        Min: ${Number(budgetMin).toLocaleString()}
                      </span>
                    )}
                    {budgetMax !== '' && Number(budgetMax) < 100000 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-md">
                        Max: ${Number(budgetMax).toLocaleString()}
                      </span>
                    )}
                    {country !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                        {country}
                      </span>
                    )}
                    {rankingTier !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-md">
                        {rankingTiers.find(t => t.value === rankingTier)?.label}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {data?.count || 0} Universities Found
              </h2>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3 text-slate-500">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm font-medium">Loading universities...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3 px-6 py-4 bg-red-50 border border-red-200 rounded-xl">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-red-700">
                    {error instanceof Error ? error.message : 'Failed to load universities'}
                  </span>
                </div>
              </div>
            )}

            {data && data.data.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {data.data.map((uni: University) => (
                  <div 
                    key={uni._id} 
                    className={`bg-white rounded-xl border p-4 sm:p-5 hover:shadow-md transition-shadow ${
                      selectedUniversities.includes(uni._id) 
                        ? 'border-indigo-500 ring-2 ring-indigo-100' 
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Selection Checkbox */}
                      <div className="pt-1">
                        <button
                          onClick={() => toggleUniversitySelection(uni._id)}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                            selectedUniversities.includes(uni._id)
                              ? 'bg-indigo-600 border-indigo-600'
                              : 'border-slate-300 hover:border-indigo-400'
                          }`}
                        >
                          {selectedUniversities.includes(uni._id) && (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {/* University Logo Placeholder */}
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-slate-400">
                          {uni.name.charAt(0)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors">
                              {uni.name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                              {uni.country} • {uni.city}
                            </p>
                          </div>
                          <div className="flex-shrink-0 px-3 py-1 bg-slate-100 rounded-full">
                            <span className="text-sm font-semibold text-slate-600">#{uni.ranking}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3 sm:mt-4">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-base sm:text-lg font-bold text-indigo-600">
                              ${uni.tuition.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-500">/yr</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-slate-700">
                              {uni.employmentRate}%
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-sm font-medium text-slate-600">
                              {uni.visaPathway}
                            </span>
                          </div>
                        </div>

                        {uni.isVerified && (
                          <div className="mt-3 flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-emerald-700">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data && data.data.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No universities found</h3>
                <p className="text-sm text-slate-500 text-center max-w-sm">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}

            {/* Floating Compare Button */}
            {selectedUniversities.length > 0 && (
              <div className="fixed bottom-6 right-6 z-40">
                <button
                  onClick={handleCompareClick}
                  disabled={selectedUniversities.length < 2}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all ${
                    selectedUniversities.length >= 2
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Compare
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
                    {selectedUniversities.length}
                  </span>
                </button>
                {selectedUniversities.length >= MAX_COMPARISON && (
                  <p className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                    Maximum {MAX_COMPARISON} universities for comparison
                  </p>
                )}
              </div>
            )}

            {/* Comparison Modal */}
            {showCompareModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">University Comparison</h2>
                    <button
                      onClick={() => setShowCompareModal(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                    <ComparisonCharts universities={selectedUniversityData} />
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr>
                            <th className="text-left p-3 text-sm font-semibold text-slate-600 bg-slate-50 rounded-tl-lg">Metric</th>
                            {selectedUniversityData.map(uni => (
                              <th key={uni._id} className="p-3 text-sm font-semibold text-slate-900 bg-slate-50">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => toggleUniversitySelection(uni._id)}
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                  {uni.name}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">Country</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-slate-900 text-center">{uni.country}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">City</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-slate-900 text-center">{uni.city}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">Ranking</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-slate-900 text-center font-semibold">#{uni.ranking}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">Tuition/Year</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-indigo-600 font-bold text-center">${uni.tuition.toLocaleString()}</td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">Employment Rate</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-slate-900 text-center">{uni.employmentRate}%</td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-3 text-sm font-medium text-slate-600">Visa Pathway</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-sm text-slate-900 text-center">{uni.visaPathway}</td>
                            ))}
                          </tr>
                          <tr className="roundedbl-lg">
                            <td className="p-3 text-sm font-medium text-slate-600">Verified</td>
                            {selectedUniversityData.map(uni => (
                              <td key={uni._id} className="p-3 text-center">
                                {uni.isVerified ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs">-</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Form Modal */}
            {showProfileForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h2 className="text-lg font-bold text-slate-900">AI Recommendations</h2>
                    </div>
                    <button
                      onClick={() => setShowProfileForm(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-600 mb-4">
                      Tell us about yourself to get personalized university recommendations tailored to your profile.
                    </p>
                    <ProfileForm onSubmit={handleProfileSubmit} />
                  </div>
                </div>
              </div>
            )}

            {/* Profile Submitted Banner */}
            {studentProfile && !showProfileForm && (
              <div className="fixed bottom-6 left-6 z-40">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold">Profile Active</p>
                    <p className="text-xs text-white/80">GPA: {studentProfile.gpa} | {studentProfile.fieldOfStudy}</p>
                  </div>
                  <button
                    onClick={() => setShowProfileForm(true)}
                    className="ml-2 p-1 hover:bg-white/20 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Recommendations Panel */}
            {recommendations.length > 0 && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h2 className="text-lg font-bold text-slate-900">Your Personalized Recommendations</h2>
                    </div>
                    <button
                      onClick={() => setRecommendations([])}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)] space-y-4">
                    {recommendations.slice(0, 5).map((rec, idx) => (
                      <div key={rec.university.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900">{rec.university.name}</h3>
                            <p className="text-sm text-slate-500">{rec.university.country} • #{rec.university.ranking}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-indigo-600">{rec.fitScore}%</div>
                            <div className="text-xs text-slate-500">Match</div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {rec.matchReason.split(', ').map((reason, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                              {reason}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <span className="text-slate-600">Tuition: <span className="font-semibold text-slate-900">${rec.university.tuition?.toLocaleString()}</span></span>
                          {rec.scholarshipEligible && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Scholarships</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}