import { useEffect } from 'react';
import { useSpring, useTransform } from 'framer-motion';

export function useAnimatedCounter(value: number) {
  const motionValue = useSpring(value, {
    damping: 100,
    stiffness: 100,
  });

  const roundedValue = useTransform(motionValue, (latest) => {
    return Math.round(latest);
  });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return roundedValue;
}
