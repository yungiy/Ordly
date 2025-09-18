/*
 *
 * @purpose
 * - 캘린더 컴포넌트의 모든 상태(State)와 비즈니스 로직(Logic)을 관리
 *
 * @states
 * - currentDate (Date): 현재 캘린더가 보여주는 기준 연/월.
 * - selectedDate (Date | null): 사용자가 선택한 날짜.
 *
 * @memoizedValues
 * - monthGrid (Date[][]): `currentDate`가 변경될 때만 `generateCalendarGrid`를 호출하여
 * 재계산되는 캘린더 날짜 그리드 데이터. 성능 최적화를 위해 `useMemo`를 사용
 *
 * @functions
 * - goToNextMonth(): `currentDate`를 다음 달로 변경
 * - goToPrevMonth(): `currentDate`를 이전 달로 변경
 * - handleSelectDate(date): `selectedDate` 상태를 사용자가 클릭한 날짜로 변경
 */

'use client';

import { calendarGrid } from '@/utils/date';
import { useMemo, useState } from 'react';

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthGrid = useMemo(() => calendarGrid(year, month), [year, month]);

  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleSelectDate = (date: Date) => setSelectedDate(date);

  return {
    year,
    month,
    currentDate,
    selectedDate,
    monthGrid,
    goToNextMonth,
    goToPrevMonth,
    handleSelectDate,
  };
};
