import { JsonValue } from '@prisma/client/runtime/library';

type TimeRange = { openTime: string; closeTime: string };

export function formatHours(hours: JsonValue | null): string | null {
  let parsedHours: any = hours;

  if (typeof parsedHours === 'string') {
    try {
      parsedHours = JSON.parse(parsedHours);
    } catch (e) {
      return '영업시간 정보 없음';
    }
  }

  if (
    !parsedHours ||
    typeof parsedHours !== 'object' ||
    Array.isArray(parsedHours)
  ) {
    return '영업시간 정보 없음';
  }

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const dayTranslations: { [key: string]: string } = {
    monday: '월',
    tuesday: '화',
    wednesday: '수',
    thursday: '목',
    friday: '금',
    saturday: '토',
    sunday: '일',
  };

  return days
    .map((day) => {
      const dayInfo = (parsedHours as Record<string, TimeRange[] | null>)[day];
      const dayName = dayTranslations[day];

      if (!dayInfo) {
        return `${dayName}: 휴무`;
      }

      const timeRanges = dayInfo
        .map((range) => `${range.openTime} - ${range.closeTime}`)
        .join(' & ');
      return `${dayName}: ${timeRanges}`;
    })
    .join('\n');
}
