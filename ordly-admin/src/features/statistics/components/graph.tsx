import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import GraphVisualizer from './graph-visualizer';

export default function Graph() {
  const date = '8월';

  return (
    <CardItem>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>{date}달 매출 추이</h2>
        <div className='flex space-x-2'>
          <Input type='date' className='border border-gray-400' />
          <Input type='date' className='border border-gray-400' />
        </div>
      </div>
      <div>
        <GraphVisualizer />
      </div>
    </CardItem>
  );
}
