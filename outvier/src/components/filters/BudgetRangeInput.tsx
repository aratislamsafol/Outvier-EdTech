'use client';

import { useState, useEffect } from 'react';

interface BudgetRangeInputProps {
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
}

export function BudgetRangeInput({ minValue, maxValue, onChange }: BudgetRangeInputProps) {
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const [error, setError] = useState<string | null>(null);
  const [isFocusedMin, setIsFocusedMin] = useState(false);
  const [isFocusedMax, setIsFocusedMax] = useState(false);

  useEffect(() => {
    setMin(minValue);
    setMax(maxValue);
  }, [minValue, maxValue]);

  const handleMinChange = (value: number) => {
    setMin(value);
    if (value > max) {
      setError('Min budget cannot exceed max budget');
    } else {
      setError(null);
      onChange(value, max);
    }
  };

  const handleMaxChange = (value: number) => {
    setMax(value);
    if (value < min) {
      setError('Max budget cannot be less than min budget');
    } else {
      setError(null);
      onChange(min, value);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-slate-700 tracking-wide">
        Budget Range
      </label>
      <div className="flex gap-3 items-end">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Min</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              value={min}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              onFocus={() => setIsFocusedMin(true)}
              onBlur={() => setIsFocusedMin(false)}
              className={`
                w-32 pl-7 pr-3 py-2.5 rounded-lg border-2 transition-all duration-200
                font-semibold text-slate-700 text-right
                ${isFocusedMin 
                  ? 'border-indigo-500 ring-2 ring-indigo-100' 
                  : 'border-slate-200 hover:border-slate-300'
                }
                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              `}
              min={0}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center w-8 h-10 mb-0.5">
          <div className="w-px h-6 bg-slate-300 rounded-full"></div>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Max</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              value={max}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              onFocus={() => setIsFocusedMax(true)}
              onBlur={() => setIsFocusedMax(false)}
              className={`
                w-32 pl-7 pr-3 py-2.5 rounded-lg border-2 transition-all duration-200
                font-semibold text-slate-700 text-right
                ${isFocusedMax 
                  ? 'border-indigo-500 ring-2 ring-indigo-100' 
                  : 'border-slate-200 hover:border-slate-300'
                }
                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              `}
              min={0}
            />
          </div>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}
      
      {(min > 0 || max < 100000) && !error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-lg">
          <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-indigo-700 font-medium">
            Showing ${min.toLocaleString()} - ${max.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}