import CardItem from '@/components/common/card-item';

interface Props {
  title: string;
  value: string;
}

export default function StatisticItem({ title, value }: Props) {
  return (
    <CardItem title={title}>
      <span className='text-xl font-bold'>{value}</span>
    </CardItem>
  );
}