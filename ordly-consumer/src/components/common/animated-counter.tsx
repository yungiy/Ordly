'use client';

import { motion } from 'framer-motion';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';

interface Props {
  value: number;
}

// 숫자가 변경될 때마다 부드럽게 카운팅되는 애니메이션을 적용하는 컴포넌트
export default function AnimatedCounter({ value }: Props) {
  const roundedValue = useAnimatedCounter(value);
  return <motion.span>{roundedValue}</motion.span>;
}
