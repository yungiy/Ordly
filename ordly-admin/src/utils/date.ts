/*
 *
 * @purpose
 * - 이 모듈은 React나 특정 UI 프레임워크에 의존하지 않는 순수 TypeScript 날짜 계산 함수들을 제공
 * - JavaScript의 네이티브 `Date` 객체를 사용하여 캘린더 표시에 필요한 모든 계산을 수행
 * - 프로젝트 전반에서 재사용될 수 있는 유틸리티 함수를 포함
 *
 * @functions
 * - getMonthDetails(year, month): 특정 연월의 시작 요일과 총 일수를 계산하여 반환
 * - generateCalendarGrid(year, month): `getMonthDetails`를 사용하여 6주치(42일)에 해당하는
 * 날짜들이 포함된 2차원 Date 배열을 생성
 */

export const getMonthDetails = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, dayInMonth };
};

export const calendarGrid = (year: number, month: number): Date[][] => {
  const { firstDay } = getMonthDetails(year, month);
  const grid: Date[][] = [];
  let currentDay = 1 - firstDay;

  for (let i = 0; i < 6; i++) { // 6주
    const week: Date[] = [];
    for (let j = 0; j < 7; j++) { // 7일
      week.push(new Date(year, month, currentDay));
      currentDay++;
    }
    grid.push(week);
  }
  return grid;
};
