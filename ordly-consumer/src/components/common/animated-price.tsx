'use client';

import { motion } from 'framer-motion';
import { useAnimatedPrice } from '@/hooks/use-animated-price';

interface Props {
  amount: number;
  className?: string;
}

function AnimatedPrice({ amount, className }: Props) {
  const formatted = useAnimatedPrice(amount);

  return <motion.span className={className}>{formatted}</motion.span>;
};

export default AnimatedPrice;
