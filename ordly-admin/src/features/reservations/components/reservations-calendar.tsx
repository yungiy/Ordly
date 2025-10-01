import Calendar from '@/components/common/calendar/calendar';

type Props = {
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
  className?: string;
};

export default function ReservationsCalendar({
  selectedDate,
  onDateClick,
}: Props) {
  return <Calendar selectedDate={selectedDate} onDateClick={onDateClick} />;
}
