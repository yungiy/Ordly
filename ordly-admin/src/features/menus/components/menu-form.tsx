import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import { Category, Menus } from '@/types/types';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  selectedMenu: Menus | 'new';
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
};

export default function MenuForm({ selectedMenu, onClose, onSuccess, categories }: Props) {
  const isNew = selectedMenu === 'new';
  const title = isNew ? '새 메뉴 추가' : '메뉴 수정';

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew) {
      setName(selectedMenu.name);
      setPrice(selectedMenu.price.toString());
      setCategoryId(selectedMenu.category.id);
      setDescription(selectedMenu.description || '');
    } else {
      setName('');
      setPrice('');
      setCategoryId('');
      setDescription('');
      setImage(null);
    }
  }, [selectedMenu, isNew]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    if (description) {
      formData.append('description', description);
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      const url = isNew ? '/api/menus' : `/api/menus/${(selectedMenu as Menus).id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isNew ? 'create' : 'update'} menu`);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardItem className='h-full flex flex-col overflow-auto scrollbar-hide'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <Button
          onClick={onClose}
          className='w-auto h-auto p-1 rounded-full hover:bg-gray-200'
        >
          <X size={30} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col flex-grow'>
        <div className='flex-grow overflow-y-auto pr-4'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>메뉴 이름</label>
              <Input
                type='text'
                className='border border-gray-400'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>카테고리</label>
              <select
                className='border border-gray-400 focus:outline-none px-4 py-2 rounded-md text-black bg-white'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>가격</label>
              <Input
                type='number'
                className='border border-gray-400'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>설명</label>
              <textarea
                rows={4}
                className='border border-gray-400 focus:outline-none px-4 py-2 rounded-md text-black'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className='font-semibold'>이미지</label>
              <input
                type='file'
                onChange={handleImageChange}
                accept="image/*"
                className='w-full border border-gray-400 rounded-md p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>

        <div className='flex gap-4 pt-4'>
          <Button
            type='button'
            onClick={onClose}
            className='bg-gray-200 py-3 font-bold hover:bg-gray-300'
          >
            취소
          </Button>
          <Button
            type='submit'
            className='bg-gray-800 py-3 font-bold text-white'
            disabled={isLoading}
          >
            {isLoading ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </CardItem>
  );
}