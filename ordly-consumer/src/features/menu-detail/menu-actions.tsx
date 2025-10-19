'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import QuantitySelector from '@/components/common/quantity-selector';
import AnimatedPrice from '@/components/common/animated-price';
import FixedActionBar from '@/components/common/fixed-action-bar';
import { useSpring, useTransform } from 'framer-motion';
import { useCartStore } from '@/store/cart.store';
import { useToastStore } from '@/store/toast.store';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/common/button';

type Props = {
  id: string;
  price: any;
  title: string;
};

export default function MenuActions({ id, price, title }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { showToast } = useToastStore();

  const totalPrice = price * quantity;

  const motionPrice = useSpring(totalPrice, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    motionPrice.set(totalPrice);
  }, [totalPrice, motionPrice]);

  const handleAddToCart = () => {
    addToCart({ id, title, price }, quantity);
    showToast(`${title} ${quantity}개를 장바구니에 담았습니다.`);
  };

  return (
    <FixedActionBar>
      <div className='p-4 border-t border-gray-200'>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 p-3 mb-4'>
          <span className='text-lg font-medium text-gray-800'>수량</span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
        <Button
          onClick={handleAddToCart}
          className='flex w-full items-center justify-center gap-2 rounded-lg bg-black py-4 text-base font-bold text-white transition'
        >
          <ShoppingCart size={18} />
          <span>
            <AnimatedPrice amount={totalPrice} /> 장바구니에 담기
          </span>
        </Button>
      </div>
    </FixedActionBar>
  );
}
