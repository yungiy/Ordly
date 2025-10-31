'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Modal from '@/components/common/modal';
import { X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Coupon } from '@prisma/client';
import { useEffect } from 'react';
import { formatDateToYYYYMMDD } from '@/utils/date';

export type CouponFormData = {
  title: string;
  description: string;
  discountType: 'FIXED' | 'PERCENTAGE';
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CouponFormData>();

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          title: initialData.title,
          description: initialData.description,
          discountType:
            initialData.discountType === 'FIXED_AMOUNT'
              ? 'FIXED'
              : initialData.discountType,
          discountValue: String(initialData.discountValue),
          validFrom: formatDateToYYYYMMDD(new Date(initialData.validFrom)),
          validUntil: formatDateToYYYYMMDD(new Date(initialData.validUntil)),
        });
      } else {
        reset({
          title: '',
          description: '',
          discountType: 'FIXED',
          discountValue: '0',
          validFrom: '',
          validUntil: '',
        });
      }
    }
  }, [open, initialData, reset]);

  const handleFormSubmit: SubmitHandler<CouponFormData> = async (data) => {
    const submitPromise = onSubmit(data);
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    await Promise.all([submitPromise, delayPromise]);
  };

  const title = initialData ? '쿠폰 수정' : '새 쿠폰 추가';

  return (
    <Modal open={open} onClose={onClose}>
      <div className='min-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-bold text-xl'>{title}</h2>
          <Button onClick={onClose} className='w-auto'>
            <X size={30} />
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                쿠폰 이름
              </label>
              <Input
                type='text'
                {...register('title', {
                  required: '쿠폰 이름은 필수입니다.',
                })}
                className='border border-gray-400'
              />
              {errors.title && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.title.message}
                </p>
              )}
            </div>
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
                <option value='FIXED'>정액</option>
                <option value='PERCENTAGE'>정률(%)</option>
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
                  validate: (value) =>
                    !isNaN(Number(value)) || '숫자만 입력해주세요.',
                  min: { value: 0, message: '0 이상의 값을 입력해주세요.' },
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
              className='bg-gray-800 text-white py-3 font-bold disabled:bg-gray-400'
              disabled={isSubmitting}
            >
              {initialData
                ? isSubmitting ? '수정 중...' : '수정'
                : isSubmitting ? '추가 중...' : '추가'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
