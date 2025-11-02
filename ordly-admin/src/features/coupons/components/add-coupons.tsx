'use client';

import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Modal from '@/components/common/modal';
import { X } from 'lucide-react';
import { useForm, SubmitHandler, FieldError, Path } from 'react-hook-form';
import type { Coupon } from '@prisma/client';
import { useEffect, ReactNode } from 'react';
import { formatDateToYYYYMMDD } from '@/utils/date';

export type CouponFormData = {
  title: string;
  description: string;
  discountType: 'FIXED' | 'PERCENTAGE';
  discountValue: string;
  validFrom: string;
  validUntil: string;
};

type FormFieldProps = {
  label: string;
  name: Path<CouponFormData>;
  error?: FieldError;
  children: ReactNode;
};

const FormField = ({ label, name, error, children }: FormFieldProps) => (
  <div>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-1'>
      {label}
    </label>
    {children}
    {error && <p className='text-red-500 text-xs mt-1'>{error.message}</p>}
  </div>
);

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
    await onSubmit(data);
  };

  const title = initialData ? '쿠폰 수정' : '새 쿠폰 추가';

  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-full max-w-md'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='font-bold text-2xl'>{title}</h2>
          <Button
            onClick={onClose}
            className='w-auto p-1 rounded-full hover:bg-gray-100'
          >
            <X size={24} />
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='flex flex-col gap-4'>
            <FormField label='쿠폰 이름' name='title' error={errors.title}>
              <Input
                type='text'
                {...register('title', {
                  required: '쿠폰 이름은 필수입니다.',
                })}
                className='border border-gray-400'
              />
            </FormField>

            <FormField
              label='쿠폰 설명'
              name='description'
              error={errors.description}
            >
              <Input
                type='text'
                {...register('description', {
                  required: '쿠폰 설명은 필수입니다.',
                })}
                className='border border-gray-400'
              />
            </FormField>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                label='할인 유형'
                name='discountType'
                error={errors.discountType}
              >
                <select
                  {...register('discountType')}
                  className='h-11 px-2 py-2.5 rounded-sm w-full border border-gray-400'
                >
                  <option value='FIXED'>정액권</option>
                  <option value='PERCENTAGE'>정률(%)권</option>
                </select>
              </FormField>

              <FormField
                label='할인 값'
                name='discountValue'
                error={errors.discountValue}
              >
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
              </FormField>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                label='유효 기간 시작일'
                name='validFrom'
                error={errors.validFrom}
              >
                <Input
                  type='date'
                  {...register('validFrom', {
                    required: '유효 기간 시작일은 필수입니다.',
                  })}
                  className='border border-gray-400'
                />
              </FormField>

              <FormField
                label='유효 기간 만료일'
                name='validUntil'
                error={errors.validUntil}
              >
                <Input
                  type='date'
                  {...register('validUntil', {
                    required: '유효 기간 만료일은 필수입니다.',
                  })}
                  className='border border-gray-400'
                />
              </FormField>
            </div>
          </div>

          <div className='mt-8 flex justify-end gap-2'>
            <Button
              type='button'
              onClick={onClose}
              className='bg-gray-200 py-3 px-5 text-gray-700 font-bold hover:bg-gray-300'
            >
              취소
            </Button>
            <Button
              type='submit'
              className='bg-gray-800 text-white py-3 px-5 font-bold disabled:bg-gray-400'
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
