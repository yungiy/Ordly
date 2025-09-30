'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Modal from '@/components/common/modal';
import { X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Coupon } from '@prisma/client';
import { useEffect } from 'react';

export type CouponFormData = {
  description: string;
  discountType: 'FIXED_AMOUNT' | 'PERCENTAGE';
  discountValue: string;
  validFrom: string;
  validUntil: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CouponFormData) => void;
  initialData?: Coupon | null;
};

export default function AddCouponModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>();

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          ...initialData,
          discountValue: String(initialData.discountValue),
          validFrom: new Date(initialData.validFrom)
            .toISOString()
            .split('T')[0],
          validUntil: new Date(initialData.validUntil)
            .toISOString()
            .split('T')[0],
        });
      } else {
        reset({
          description: '',
          discountType: 'FIXED_AMOUNT',
          discountValue: '0',
          validFrom: '',
          validUntil: '',
        });
      }
    }
  }, [open, initialData, reset]);

  const handleFormSubmit: SubmitHandler<CouponFormData> = (data) => {
    onSubmit(data);
  };

  const title = initialData ? '쿠폰 수정' : '새 쿠폰 추가';

  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='font-bold text-xl'>{title}</h2>
        <Button onClick={onClose} className='w-10 h-10'>
          <X />
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              쿠폰 설명
            </label>
            <Input
              type='text'
              {...register('description', {
                required: '쿠폰 설명은 필수입니다.',
              })}
              className='border border-gray-400'
            />
            {errors.description && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='discountType'
              className='block text-sm font-medium text-gray-700'
            >
              할인 유형
            </label>
            <select
              {...register('discountType')}
              className='px-2 py-2.5 rounded-sm w-full border border-gray-400'
            >
              <option value='FIXED_AMOUNT'>정액</option>
              <option value='PERCENTAGE'>정률</option>
            </select>
          </div>
          <div>
            <label
              htmlFor='discountValue'
              className='block text-sm font-medium text-gray-700'
            >
              할인 값
            </label>
            <Input
              type='text'
              {...register('discountValue', {
                required: '할인 값은 필수입니다.',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message:
                    '숫자 또는 소수점 둘째 자리까지의 숫자만 입력해주세요.',
                },
              })}
              className='border border-gray-400'
            />
            {errors.discountValue && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.discountValue.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              유효 기간 시작일
            </label>
            <Input
              type='date'
              {...register('validFrom', {
                required: '유효 기간 시작일은 필수입니다.',
              })}
              className='border border-gray-400'
            />
            {errors.validFrom && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.validFrom.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='validUntil'
              className='block text-sm font-medium text-gray-700'
            >
              유효 기간 만료일
            </label>
            <Input
              type='date'
              {...register('validUntil', {
                required: '유효 기간 만료일은 필수입니다.',
              })}
              className='border border-gray-400'
            />
            {errors.validUntil && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.validUntil.message}
              </p>
            )}
          </div>
        </div>
        <div className='mt-6 flex justify-end gap-2'>
          <Button
            type='button'
            onClick={onClose}
            className='bg-gray-200 py-3 text-gray-700 font-bold hover:bg-gray-300'
          >
            취소
          </Button>
          <Button
            type='submit'
            className='bg-gray-800 text-white py-3 font-bold'
          >
            {initialData ? '수정' : '추가'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
