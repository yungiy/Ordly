import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import Input from '@/components/common/input';
import {
  useCreateMenu,
  useUpdateMenu,
} from '@/hooks/useMenus.hooks';
import { Category, Menus } from '@/types/types';
import { UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type MenuFormData = Omit<Menus, 'id' | 'price' | 'category' | 'imageUrl' | 'image'> & {
  price: number;
  categoryId: string;
};

type Props = {
  selectedMenu: Menus | 'new';
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
};

export default function MenuForm({
  selectedMenu,
  onClose,
  onSuccess,
  categories,
}: Props) {
  const isNew = selectedMenu === 'new';
  const title = isNew ? '새 메뉴 추가' : '메뉴 수정';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuFormData>();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createMenu, isPending: isCreating } = useCreateMenu();
  const { mutate: updateMenu, isPending: isUpdating } = useUpdateMenu();

  useEffect(() => {
    if (!isNew) {
      reset({
        name: selectedMenu.name,
        price: selectedMenu.price,
        categoryId: selectedMenu.category.id,
        description: selectedMenu.description || '',
      });
      setImagePreview(selectedMenu.imageUrl || null);
      setImage(null);
    } else {
      reset({
        name: '',
        price: 0,
        categoryId: '',
        description: '',
      });
      setImage(null);
      setImagePreview(null);
    }
  }, [selectedMenu, isNew, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const onSubmit: SubmitHandler<MenuFormData> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', String(data.price));
    formData.append('categoryId', data.categoryId);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (image) {
      formData.append('image', image);
    }

    if (isNew) {
      createMenu(formData, { onSuccess });
    } else {
      updateMenu(
        { id: (selectedMenu as Menus).id, formData },
        { onSuccess }
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <CardItem className='overflow-auto scrollbar-hide relative'>
      {isLoading && <div className='absolute inset-0 bg-white/50 z-10' />}
      <div className='flex justify-between items-center pb-1'>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <Button onClick={onClose} className='w-auto'>
          <X size={30} />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col flex-grow'
      >
        <div className='flex-grow overflow-y-auto'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>메뉴 이름</label>
              <Input
                type='text'
                className='border border-gray-400'
                {...register('name', { required: '메뉴 이름을 입력해주세요.' })}
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>카테고리</label>
              <select
                className='border border-gray-400 focus:outline-none px-2 py-2.5 rounded-md text-black bg-white'
                {...register('categoryId', {
                  required: '카테고리를 선택해주세요.',
                })}
              >
                <option value=''>카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className='text-red-500 text-sm'>
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>가격</label>
              <Input
                type='number'
                className='border border-gray-400'
                {...register('price', {
                  required: '가격을 입력해주세요.',
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className='text-red-500 text-sm'>{errors.price.message}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>설명</label>
              <textarea
                rows={4}
                className='border border-gray-400 focus:outline-none px-4 py-2 rounded-md text-black'
                {...register('description')}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold'>이미지 업로드</label>
              <div className='mt-1 flex justify-center px-6 py-2 border-2 border-gray-300 border-dashed rounded-md'>
                <div className='space-y-1 text-center'>
                  {imagePreview ? (
                    <div className='relative group w-32 h-32 mx-auto'>
                      <img
                        src={imagePreview}
                        alt='미리보기'
                        className='w-full h-full object-cover rounded-md'
                      />
                      <div className='absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md'>
                        <Button
                          type='button'
                          onClick={handleRemoveImage}
                          className='text-white bg-red-500 hover:bg-red-600 px-2 py-1 text-xs rounded'
                        >
                          제거
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <UploadCloud className='mx-auto h-12 w-12 text-gray-400' />
                  )}
                  <div className='flex text-sm text-gray-600 justify-center'>
                    <label
                      htmlFor='image-upload'
                      className='relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none'
                    >
                      <span className='text-lg'>파일 선택</span>
                      <input
                        type='file'
                        className='sr-only'
                        id='image-upload'
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        accept='image/*'
                      />
                    </label>
                  </div>
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-4 pt-4 mt-auto'>
            <Button
              type='button'
              onClick={onClose}
              className='flex-1 bg-gray-200 py-3 font-bold hover:bg-gray-300'
            >
              취소
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-gray-800 py-3 font-bold text-white disabled:bg-gray-400'
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장'}
            </Button>
          </div>
        </div>
      </form>
    </CardItem>
  );
}
