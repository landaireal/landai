import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({ min, max, value, onChange }: Props) {
  const { language } = useLanguage();
  const [localValue, setLocalValue] = useState(value);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    const newValue: [number, number] = [Math.min(newMin, localValue[1]), localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    const newValue: [number, number] = [localValue[0], Math.max(newMax, localValue[0])];
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <DollarSign className="w-5 h-5 text-slate-500 dark:text-slate-400" />
        <h3 className="font-semibold text-slate-700 dark:text-slate-300">
          {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
        </h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            ${localValue[0].toLocaleString()}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            ${localValue[1].toLocaleString()}
          </span>
        </div>

        <div className="relative pt-2">
          <input
            type="range"
            min={min}
            max={max}
            value={localValue[0]}
            onChange={handleMinChange}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
            style={{ zIndex: localValue[0] > max - 100 ? 5 : 3 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={localValue[1]}
            onChange={handleMaxChange}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
            style={{ zIndex: 4 }}
          />
          <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
            <div
              className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 rounded-full"
              style={{
                left: `${((localValue[0] - min) / (max - min)) * 100}%`,
                right: `${100 - ((localValue[1] - min) / (max - min)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"] {
          pointer-events: all;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .dark input[type="range"]::-webkit-slider-thumb {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
        }
        .dark input[type="range"]::-moz-range-thumb {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
        }
      `}</style>
    </div>
  );
}
