'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Coupon } from '@prisma/client';
import CouponTable from './coupons-tables';
import AddCouponModal, { CouponFormData } from './add-coupons';
import DeleteCouponModal from './delete-coupon-modal';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useApiMutation } from '@/hooks/useApiMutation.hooks';
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  CreateCouponDto,
} from '../api/coupons.api';
import CouponSkeleton from '@/components/skeleton/coupon-skeleton';

export default function Coupons() {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState<{
    type: 'add' | 'edit' | 'delete' | null;
    coupon?: Coupon | null;
    couponId?: string | null;
  }>({ type: null });

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useApiQuery<Coupon[]>(['coupons'], getCoupons);

  const invalidateCouponsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['coupons'] });
  };

  const createCouponMutation = useApiMutation(createCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
      handleCloseModals();
    },
  });

  const updateCouponMutation = useApiMutation(updateCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
      handleCloseModals();
    },
  });

  const deleteCouponMutation = useApiMutation(deleteCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
      handleCloseModals();
    },
  });

  const handleOpenEditModal = (id: string) => {
    const couponToEdit = coupons.find((c) => c.id === id);
    if (couponToEdit) {
      setModalState({ type: 'edit', coupon: couponToEdit });
    }
  };

  const handleOpenAddModal = () => {
    setModalState({ type: 'add' });
  };

  const handleOpenDeleteModal = (id: string) => {
    setModalState({ type: 'delete', couponId: id });
  };

  const handleCloseModals = () => {
    setModalState({ type: null });
  };

  const confirmDelete = () => {
    if (modalState.type === 'delete' && modalState.couponId) {
      deleteCouponMutation.mutate(modalState.couponId);
    }
  };

  const editingCoupon = modalState.type === 'edit' ? modalState.coupon : null;

  const handleSubmit = (data: CouponFormData) => {
    const couponPayload: CreateCouponDto = {
      title: data.title,
      description: data.description,
      discountType:
        data.discountType === 'FIXED' ? 'FIXED_AMOUNT' : data.discountType,
      discountValue: Number(data.discountValue),
      validFrom: new Date(data.validFrom),
      validUntil: new Date(data.validUntil),
    };

    if (editingCoupon) {
      const updatePayload = {
        ...couponPayload,
        isActive: editingCoupon.isActive,
      };
      updateCouponMutation.mutate({
        id: editingCoupon.id,
        data: updatePayload,
      });
    } else {
      createCouponMutation.mutate(couponPayload);
    }
  };

  if (isLoading) return <CouponSkeleton />;
  if (isError) return <div>Error loading coupons: {error.message}</div>;

  return (
    <div className='flex flex-col p-4 h-full'>
      <CouponTable
        coupons={coupons}
        onAddNewCoupon={handleOpenAddModal}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />
      <AddCouponModal
        open={modalState.type === 'add' || modalState.type === 'edit'}
        onClose={handleCloseModals}
        onSubmit={handleSubmit}
        initialData={editingCoupon}
      />
      <DeleteCouponModal
        open={modalState.type === 'delete'}
        onClose={handleCloseModals}
        onConfirm={confirmDelete}
        isPending={deleteCouponMutation.isPending}
      />
    </div>
  );
}
