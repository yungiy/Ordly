// /components/common/calendar/CalendarHeader.tsx

type Props = {
  year: number;
  month: number; 
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({ year, month, onPrev, onNext }: Props) {
  const monthName = new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(new Date(year, month));

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">{year}년 {monthName}</h2>
      <div className="flex items-center gap-2">
        <button onClick={onPrev} className="px-2 py-1 rounded hover:bg-gray-100">‹</button>
        <button onClick={onNext} className="px-2 py-1 rounded hover:bg-gray-100">›</button>
      </div>
    </div>
  );
}