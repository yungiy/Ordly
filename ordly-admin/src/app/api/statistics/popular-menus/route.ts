import { NextRequest, NextResponse } from 'next/server';

const mockData = {
  monthly: [ 
    { rank: 1, name: '아메리카노', orders: 161 }, 
    { rank: 2, name: '라떼', orders: 123 },       
    { rank: 3, name: '소금빵', orders: 71 },     
    { rank: 4, name: '바스크 치즈케이크', orders: 60 },
    { rank: 5, name: '초코라떼', orders: 55 },   
  ],
  'six-months': [ 
    { rank: 1, name: '아메리카노', orders: 979 },
    { rank: 2, name: '라떼', orders: 800 },
    { rank: 3, name: '스파게티', orders: 567 },    
    { rank: 4, name: '바스크 치즈케이크', orders: 521 },
    { rank: 5, name: '망고빙수', orders: 436 },   
  ],
  yearly: [ 
    { rank: 1, name: '아메리카노', orders: 2204 },
    { rank: 2, name: '라떼', orders: 1701 },
    { rank: 3, name: '스파게티', orders: 1311 },
    { rank: 4, name: '망고빙수', orders: 1152 },
    { rank: 5, name: '바스크 치즈케이크', orders: 892 },
  ],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period');

  switch (period) {
    case 'monthly':
      return NextResponse.json(mockData.monthly);
    case 'six-months':
      return NextResponse.json(mockData['six-months']);
    case 'yearly':
      return NextResponse.json(mockData.yearly);
    default:
      return NextResponse.json(mockData.monthly);
  }
}
