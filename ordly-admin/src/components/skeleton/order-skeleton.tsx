import React from 'react';
import CardItem from '../common/card-item'; // CardItem 경로를 확인해주세요.

export default function OrderSkeleton() {
  return (
    <div className='flex-1 flex gap-4 p-2 animate-pulse'>
      {[...Array(3)].map((_, colIndex) => (
        <div key={`col-${colIndex}`} className='flex-1 flex'>
          <CardItem className='h-full w-full flex flex-col'>
            <div className='h-6 bg-gray-300 rounded w-1/3 mb-4'></div>
            <div className='flex-1 overflow-hidden p-2 space-y-3'>
              {[...Array(4)].map((_, cardIndex) => (
                <div
                  key={`card-${colIndex}-${cardIndex}`}
                  className='bg-gray-100 rounded-lg p-3 mb-3 flex justify-between items-center'
                >
                  <div className='space-y-2 flex-grow mr-4'>
                    <div className='h-5 bg-gray-200 rounded-md w-3/5'></div>
                    <div className='h-4 bg-gray-200 rounded-md w-4/5'></div>
                  </div>
                  <div className='flex space-x-2'>
                    <div className='h-8 w-12 bg-gray-300 rounded-md'></div>
                    <div className='h-8 w-12 bg-gray-300 rounded-md'></div>
                  </div>
                </div>
              ))}
            </div>
          </CardItem>
        </div>
      ))}
    </div>
  );
}
