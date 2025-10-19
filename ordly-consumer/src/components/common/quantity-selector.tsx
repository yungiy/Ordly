'use client';

import { Minus, Plus } from 'lucide-react';
import React from 'react';
import Button from './button';

type Props = {
  value: number;
  min?: number;
  onChange: (value: number) => void;
};

function QuantitySelector({ value, min = 1, onChange }: Props) {
  const handleDecrease = () => onChange(Math.max(min, value - 1));
  const handleIncrease = () => onChange(value + 1);

  return (
    <div className='flex items-center gap-4'>
      <Button
        onClick={handleDecrease}
        className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300 disabled:opacity-50'
        disabled={value <= min}
      >
        <Minus size={16} />
      </Button>
      <span className='w-8 text-center text-lg font-bold text-gray-900'>
        {value}
      </span>
      <button
        onClick={handleIncrease}
        className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-gray-300'
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default QuantitySelector;
