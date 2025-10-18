'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import OrderHistoryEmpty from './order-history-empty';
import OrderHistoryList from './order-history-list';
import type { OrderWithItems } from './order-history-list';

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const myOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');

        if (myOrders.length === 0) {
          setOrders([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        const params = new URLSearchParams({
          orderNumbers: JSON.stringify(myOrders),
        });
        const response = await fetch(`/api/order-history?${params.toString()}`);

        if (!response.ok) {
          throw new Error('주문 내역을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header
        title='주문내역'
        showBackButton
        onClick={() => router.push('/')}
      />
      {error && (
        <div className='flex justify-center items-center flex-grow text-red-500'>
          {error}
        </div>
      )}
      {!loading &&
        !error &&
        (orders.length === 0 ? (
          <OrderHistoryEmpty />
        ) : (
          <OrderHistoryList orders={orders} />
        ))}
    </div>
  );
}
