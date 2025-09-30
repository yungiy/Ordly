import { NextRequest, NextResponse } from 'next/server';

const mockData = {
  monthly: [
    { rank: 1, name: '아메리카노 (ICE)', orders: 152 },
    { rank: 2, name: '카페라떼 (ICE)', orders: 110 },
    { rank: 3, name: '치즈케이크', orders: 85 },
    { rank: 4, name: '소금빵', orders: 76 },
    { rank: 5, name: 'IPA', orders: 64 },
  ],
  'six-months': [
    { rank: 1, name: '아메리카노 (ICE)', orders: 980 },
    { rank: 2, name: '카페라떼 (ICE)', orders: 750 },
    { rank: 3, name: '감바스', orders: 540 },
    { rank: 4, name: '치즈케이크', orders: 521 },
    { rank: 5, name: '하이볼', orders: 488 },
  ],
  yearly: [
    { rank: 1, name: '아메리카노 (ICE)', orders: 2103 },
    { rank: 2, name: '카페라떼 (ICE)', orders: 1800 },
    { rank: 3, name: '하이볼', orders: 1204 },
    { rank: 4, name: '감바스', orders: 1100 },
    { rank: 5, name: '치즈케이크', orders: 998 },
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
      // period가 null이거나 유효하지 않은 경우 기본값으로 monthly 데이터를 반환합니다.
      return NextResponse.json(mockData.monthly);
  }
}
