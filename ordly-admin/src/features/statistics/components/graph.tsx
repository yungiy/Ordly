'use client';

import { useState } from 'react';
import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import GraphVisualizer from './graph-visualizer';

export default function Graph() {
  // 날짜 상태 관리 (기본값: 2023년 11월)
  const [startDate, setStartDate] = useState('2023-11-01');
  const [endDate, setEndDate] = useState('2023-11-30');

  return (
    <CardItem className='overflow-auto scrollbar-hide'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>각종 그래프로 보기</h2>
        <div className='flex space-x-2'>
          <Input
            type='date'
            className='border border-gray-400'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type='date'
            className='border border-gray-400'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <GraphVisualizer startDate={startDate} endDate={endDate} />
      </div>
    </CardItem>
  );
}
