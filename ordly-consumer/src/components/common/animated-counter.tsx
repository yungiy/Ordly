'use client';

import { motion } from 'framer-motion';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter.hooks';

type Props = {
  value: number;
}

export default function AnimatedCounter({ value }: Props) {
  const roundedValue = useAnimatedCounter(value);
  return <motion.span>{roundedValue}</motion.span>;
}
