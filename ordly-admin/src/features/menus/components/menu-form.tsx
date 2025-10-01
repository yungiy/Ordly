import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import { Menus } from '@/types/types';
import { X } from 'lucide-react';

interface Props {
  selectedMenu: Menus | 'new';
  onClose: () => void;
}

export default function MenuForm({ selectedMenu, onClose }: Props) {
  const isNew = selectedMenu === 'new';
  const title = isNew ? '새 메뉴 추가' : '메뉴 수정';

  return (
    <CardItem className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <Button
          onClick={onClose}
          className='w-auto h-auto p-1 rounded-full hover:bg-gray-200'
        >
          <X size={30} />
        </Button>
      </div>

      <form className='flex flex-col gap-4 flex-grow'>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>메뉴 이름</label>
          <Input
            type='text'
            className='border border-gray-400'
            defaultValue={!isNew ? selectedMenu.name : ''}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>카테고리</label>
          <Input
            type='text'
            className='border border-gray-400'
            defaultValue={!isNew ? selectedMenu.category : ''}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>가격</label>
          <Input
            type='text'
            className='border border-gray-400'
            defaultValue={!isNew ? selectedMenu.price : ''}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>설명</label>
          <textarea
            rows={4}
            className='border border-gray-400 focus:outline-none px-4 py-2 rounded-md text-black'
            defaultValue={!isNew ? selectedMenu.description : ''}
          />
        </div>
        <div>
          <label className='font-semibold'>이미지</label>
          <input
            type='file'
            className='w-full border border-gray-400 rounded-md p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
          />
        </div>

        <div className='mt-auto flex gap-4'>
          <Button
            type='button'
            onClick={onClose}
            className='bg-gray-200 py-3 font-bold hover:bg-gray-300'
          >
            취소
          </Button>
          <Button
            type='submit'
            className='bg-gray-800 py-3 font-bold text-white '
          >
            저장
          </Button>
        </div>
      </form>
    </CardItem>
  );
}
