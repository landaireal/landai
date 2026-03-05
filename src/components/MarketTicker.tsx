import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketTicker() {
  const { isRtl } = useLanguage();

  const englishData = [
    { label: 'Downtown Dubai', value: '+3.2%', up: true },
    { label: 'Palm Jumeirah', value: '+5.8%', up: true },
    { label: 'Dubai Marina', value: '+1.4%', up: true },
    { label: 'Abu Dhabi Corniche', value: '+2.1%', up: true },
    { label: 'Business Bay', value: '-0.5%', up: false },
    { label: 'JVC', value: '+4.2%', up: true },
    { label: 'Dubai Hills Estate', value: '+6.1%', up: true },
    { label: 'Al Reem Island', value: '+1.9%', up: true },
  ];

  const arabicData = [
    { label: 'وسط مدينة دبي', value: '+3.2%', up: true },
    { label: 'نخلة جميرا', value: '+5.8%', up: true },
    { label: 'دبي مارينا', value: '+1.4%', up: true },
    { label: 'كورنيش أبوظبي', value: '+2.1%', up: true },
    { label: 'الخليج التجاري', value: '-0.5%', up: false },
    { label: 'قرية جميرا الدائرية', value: '+4.2%', up: true },
    { label: 'دبي هيلز استيت', value: '+6.1%', up: true },
    { label: 'جزيرة الريم', value: '+1.9%', up: true },
  ];

  const data = isRtl ? arabicData : englishData;
  // Double the array for seamless marquee
  const items = [...data, ...data];

  return (
    <div className="w-full glass-12d-panel border-y border-cyan-500/30 text-white py-4 overflow-hidden relative flex z-30 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030014] via-[#030014]/80 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center px-8 text-sm tracking-widest uppercase font-bold">
            <span className="mr-3 rtl:ml-3 rtl:mr-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{item.label}</span>
            <span className={`flex items-center font-bold px-2 py-1 rounded bg-black/40 border ${item.up ? 'text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'}`}>
              {item.value}
              {item.up ? (
                <TrendingUp size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
              ) : (
                <TrendingDown size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
              )}
            </span>
            <span className="mx-10 text-cyan-500/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}