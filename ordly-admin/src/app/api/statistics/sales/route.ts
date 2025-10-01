import { NextRequest, NextResponse } from 'next/server';

// 시간대별 매출 Mock 데이터 (단일 날짜 선택 시)
const hourlySalesData = {
  salesByHour: [
    { time: '09:00', sales: 25000 },
    { time: '10:00', sales: 45000 },
    { time: '11:00', sales: 75000 },
    { time: '12:00', sales: 125000 },
    { time: '13:00', sales: 110000 },
    { time: '14:00', sales: 95000 },
    { time: '15:00', sales: 80000 },
  ],
  salesByMenu: [
    { name: '아메리카노', sales: 180000 },
    { name: '카페라떼', sales: 120000 },
    { name: '치즈케이크', sales: 95000 },
    { name: '기타', sales: 60000 },
  ],
};

// 일별 매출 Mock 데이터 (기간 선택 시)
const dailySalesData = {
  salesByDay: [
    { date: '2025-09-24', sales: 480000 },
    { date: '2025-09-25', sales: 520000 },
    { date: '2025-09-26', sales: 780000 },
    { date: '2025-09-27', sales: 950000 },
    { date: '2025-09-28', sales: 920000 },
    { date: '2025-09-29', sales: 610000 },
    { date: '2025-09-30', sales: 555000 },
  ],
  salesByMenu: [
    { name: '아메리카노', sales: 1250000 },
    { name: '카페라떼', sales: 980000 },
    { name: '치즈케이크', sales: 760000 },
    { name: '감바스', sales: 540000 },
    { name: '기타', sales: 800000 },
  ],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const startDate = searchParams.get('startDate');

  // 기간(startDate)이 있으면 일별 데이터, 없으면 시간별 데이터 반환
  if (startDate) {
    return NextResponse.json(dailySalesData);
  } else {
    return NextResponse.json(hourlySalesData);
  }
}
