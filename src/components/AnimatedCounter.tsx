import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [value, duration, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => setDisplayValue(latest));
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
