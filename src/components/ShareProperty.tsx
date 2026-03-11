import { useState } from 'react';
import { Share2, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyId: string;
  propertyTitle: string;
}

export default function ShareProperty({ propertyId, propertyTitle }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  const shareUrl = `${window.location.origin}/properties/${propertyId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVia = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(propertyTitle + ' - ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(propertyTitle)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
      >
        <Share2 className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'مشاركة العقار' : 'Share Property'}
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <button onClick={() => shareVia('whatsapp')} className="flex-1 p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold">
                    WhatsApp
                  </button>
                  <button onClick={() => shareVia('facebook')} className="flex-1 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
                    Facebook
                  </button>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => shareVia('twitter')} className="flex-1 p-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold">
                    Twitter
                  </button>
                  <button onClick={() => shareVia('email')} className="flex-1 p-4 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-semibold">
                    Email
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-400"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-xl transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
