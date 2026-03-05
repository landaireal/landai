import { useLanguage } from '../context/LanguageContext';
import { Network, Fingerprint, ShieldCheck, Coins } from 'lucide-react';

export default function FractionalOwnership() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'ملكية عقارية جزئية' : 'Fractional Real Estate',
    subtitle: isAr ? 'استثمر في عقارات دبي الفاخرة ابتداءً من 100 دولار عبر تقنية Web3' : 'Own premium Dubai real estate starting at $100 via Web3 tokenization',
    connectWallet: isAr ? 'ربط المحفظة' : 'Connect Wallet',
    tokenized: isAr ? 'تم ترميز' : 'Tokenized',
    available: isAr ? 'المتاح' : 'Available',
    buyTokens: isAr ? 'شراء رموز (Tokens)' : 'Buy Tokens'
  };

  const assets = [
    {
      id: 1,
      title: 'Burj Khalifa Sky Suite',
      price: '$5,000,000',
      tokenPrice: '$100',
      progress: 75,
      tokensAvailable: '12,500 / 50,000',
      yield: '14.2% APY',
      image: 'https://images.unsplash.com/photo-1577942691763-8ce058a5c325?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Palm Jumeirah Water Villa',
      price: '$8,200,000',
      tokenPrice: '$250',
      progress: 42,
      tokensAvailable: '19,024 / 32,800',
      yield: '18.5% APY',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section id="tokenization" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto relative z-10 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_50%)] pointer-events-none transition-colors"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute -inset-10 bg-blue-500/5 dark:bg-cyan-500/10 blur-3xl rounded-full pointer-events-none transition-colors"></div>
          <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-purple-500 uppercase flex items-center gap-4 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-colors">
            <Network className="w-12 h-12 text-blue-600 dark:text-cyan-400" />
            {t.title}
          </h2>
          <p className="text-xl text-blue-500/80 dark:text-cyan-200/60 font-bold uppercase tracking-widest transition-colors">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {assets.map((asset) => (
          <div key={asset.id} className="glass-12d rounded-[2.5rem] p-6 relative group overflow-hidden border border-indigo-200 dark:border-purple-500/20 hover:border-blue-400 dark:hover:border-cyan-400 transition-all duration-500 shadow-sm dark:shadow-md">
            {/* Holographic Token Background */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-30 transition-opacity duration-1000 text-blue-500 dark:text-cyan-400">
              <Coins className="w-96 h-96 animate-spin-slow" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-full md:w-1/3 h-48 rounded-[2rem] overflow-hidden relative border border-zinc-200 dark:border-white/10">
                <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/80 to-transparent transition-colors"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-emerald-300 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                  Verified
                </div>
              </div>

              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] uppercase tracking-wider transition-colors">{asset.title}</h3>
                
                <div className="flex justify-between items-center mb-6 border-b border-zinc-200 dark:border-white/10 pb-4 transition-colors">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest transition-colors">Total Value</p>
                    <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 transition-colors">{asset.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 dark:text-cyan-500 font-bold uppercase tracking-widest transition-colors">Token Price</p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-purple-400 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-colors">
                      {asset.tokenPrice}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 transition-colors">
                    <span className="text-indigo-600 dark:text-purple-300 transition-colors">{t.tokenized}</span>
                    <span className="text-blue-600 dark:text-cyan-400 transition-colors">{asset.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-300 dark:border-white/5 transition-colors">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-purple-500 dark:to-cyan-400 shadow-sm dark:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-colors"
                      style={{ width: `${asset.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-[10px] text-zinc-400 dark:text-zinc-500 mt-2 font-bold tracking-widest uppercase transition-colors">
                    {t.available}: {asset.tokensAvailable}
                  </p>
                </div>

                <button className="w-full py-4 rounded-xl bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-500/50 hover:bg-blue-100 dark:hover:bg-cyan-900 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] text-blue-700 dark:text-cyan-100 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  <Fingerprint className="w-5 h-5" />
                  {t.buyTokens}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}