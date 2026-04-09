'use client';

import { useState } from 'react';

export interface StudentProfile {
  gpa: number;
  fieldOfStudy: string;
  budgetMin: number;
  budgetMax: number;
}

interface ProfileFormProps {
  onSubmit: (profile: StudentProfile) => void;
}

const FIELDS_OF_STUDY = [
  'Computer Science',
  'Engineering',
  'Business',
  'Medicine',
  'Arts',
  'Sciences',
  'Law',
  'Other',
];

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [profile, setProfile] = useState<StudentProfile>({
    gpa: 0,
    fieldOfStudy: '',
    budgetMin: 0,
    budgetMax: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StudentProfile, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StudentProfile, string>> = {};
    
    if (!profile.gpa) {
      newErrors.gpa = 'GPA is required';
    } else {
      if (profile.gpa < 0 || profile.gpa > 4.0) {
        newErrors.gpa = 'GPA must be between 0 and 4.0';
      }
    }
    
    if (!profile.fieldOfStudy) {
      newErrors.fieldOfStudy = 'Field of study is required';
    }
    
    if (!profile.budgetMin && !profile.budgetMax) {
      newErrors.budgetMin = 'At least one budget field is required';
      newErrors.budgetMax = 'At least one budget field is required';
    } else if (profile.budgetMin > 0 && profile.budgetMax > 0 && profile.budgetMin > profile.budgetMax) {
      newErrors.budgetMin = 'Min budget cannot exceed max budget';
      newErrors.budgetMax = 'Max budget cannot be less than min budget';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(profile);
    }
  };

  const handleChange = (field: keyof StudentProfile, value: string) => {
    const convertedValue = (field === 'gpa' || field === 'budgetMin' || field === 'budgetMax') 
      ? (value === '' ? 0 : Number(value))
      : value;
    setProfile(prev => ({ ...prev, [field]: convertedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* GPA Input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          GPA (0-4.0)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="4.0"
          value={profile.gpa}
          onChange={(e) => handleChange('gpa', e.target.value)}
          className={`w-full px-4 py-2.5 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.gpa 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-slate-200 bg-slate-50 focus:border-indigo-500'
          }`}
          placeholder="e.g., 3.5"
        />
        {errors.gpa && (
          <p className="mt-1 text-xs text-red-500">{errors.gpa}</p>
        )}
      </div>

      {/* Field of Study */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Field of Study
        </label>
        <select
          value={profile.fieldOfStudy}
          onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
          className={`w-full px-4 py-2.5 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.fieldOfStudy 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-slate-200 bg-slate-50 focus:border-indigo-500'
          }`}
        >
          <option value="">Select a field</option>
          {FIELDS_OF_STUDY.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        {errors.fieldOfStudy && (
          <p className="mt-1 text-xs text-red-500">{errors.fieldOfStudy}</p>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Budget Range ($/year)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              value={profile.budgetMin}
              onChange={(e) => handleChange('budgetMin', e.target.value)}
              className={`w-full px-4 py-2.5 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.budgetMin 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-emerald-200 bg-emerald-50 focus:border-emerald-500'
              }`}
              placeholder="Min"
            />
          </div>
          <div>
            <input
              type="number"
              value={profile.budgetMax}
              onChange={(e) => handleChange('budgetMax', e.target.value)}
              className={`w-full px-4 py-2.5 text-sm border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.budgetMax 
                  ? 'border-red-300 bg-red-50 focus:border-red-500' 
                  : 'border-rose-200 bg-rose-50 focus:border-rose-500'
              }`}
              placeholder="Max"
            />
          </div>
        </div>
        {(errors.budgetMin || errors.budgetMax) && (
          <p className="mt-1 text-xs text-red-500">{errors.budgetMin || errors.budgetMax}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Get Personalized Recommendations
      </button>
    </form>
  );
}