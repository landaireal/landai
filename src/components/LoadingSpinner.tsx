import { motion } from 'framer-motion';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ size = 'md', message }: Props) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-blue-200 dark:border-cyan-900 border-t-blue-600 dark:border-t-cyan-400 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {message && (
        <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
