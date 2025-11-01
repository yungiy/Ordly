'use client';

import { useState } from 'react';
import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import GraphVisualizer from './graph-visualizer';

export default function Graph() {
  const [startDate, setStartDate] = useState('2023-11-01');
  const [endDate, setEndDate] = useState('2023-11-30');

  return (
    <CardItem className='p-4'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
        <h2 className='font-bold text-xl'>각종 그래프로 보기</h2>
        <div className='flex items-center gap-4 flex-nowrap'>
          <div className='flex items-center gap-2'>
            <label htmlFor='startDate' className='text-sm font-medium text-gray-600 whitespace-nowrap'>
              시작일
            </label>
            <Input
              id='startDate'
              type='date'
              className='border border-gray-300 rounded-md p-1.5 text-sm w-full'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label htmlFor='endDate' className='text-sm font-medium text-gray-600 whitespace-nowrap'>
              종료일
            </label>
            <Input
              id='endDate'
              type='date'
              className='border border-gray-300 rounded-md p-1.5 text-sm w-full'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <GraphVisualizer startDate={startDate} endDate={endDate} />
    </CardItem>
  );
}
