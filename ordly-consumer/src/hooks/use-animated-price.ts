import { useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { formatCurrency } from '@/utils/format';

export function useAnimatedPrice(amount: number) {
  const spring = useSpring(amount, {
    stiffness: 300,
    damping: 30,
  });

  const formatted = useTransform(spring, (latest) =>
    formatCurrency(Math.round(latest))
  );

  useEffect(() => {
    spring.set(amount);
  }, [amount, spring]);

  return formatted;
}
