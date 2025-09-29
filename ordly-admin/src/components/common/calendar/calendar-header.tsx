import Button from '../button';

type Props = {
  year: number;
  month: number; 
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({ year, month, onPrev, onNext }: Props) {
  const monthName = new Intl.DateTimeFormat('ko-KR', { month: 'long' }).format(new Date(year, month));

  return (
    <div className="flex items-center justify-between p-1 py-4">
      <h2 className="text-2xl font-bold">{year}년 {monthName}</h2>
      <div className="flex items-center gap-4">
        <Button onClick={onPrev} className="px-2 py-1 rounded hover:bg-gray-100">‹</Button>
        <Button onClick={onNext} className="px-2 py-1 rounded hover:bg-gray-100">›</Button>
      </div>
    </div>
  );
}