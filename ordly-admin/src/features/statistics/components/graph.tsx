import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import GraphVisualizer from './graph-visualizer';

export default function Graph() {
  return (
    <CardItem className='overflow-auto scrollbar-hide'>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>각종 그래프로 보기</h2>
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
