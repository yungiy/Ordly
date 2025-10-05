'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Coupon } from '@prisma/client';
import CouponTable from './coupons-tables';
import AddCouponModal, { CouponFormData } from './add-coupons';
import DeleteCouponModal from './delete-coupon-modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery<Coupon[]>({
    queryKey: ['coupons'],
    queryFn: getCoupons,
  });

  const invalidateCouponsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['coupons'] });
  };

  const createCouponMutation = useApiMutation(createCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
      handleCloseModal();
    },
  });

  const updateCouponMutation = useApiMutation(updateCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
      handleCloseModal();
    },
  });

  const deleteCouponMutation = useApiMutation(deleteCoupon, {
    onSuccess: () => {
      invalidateCouponsQuery();
    },
  });

  const handleOpenEditModal = (id: string) => {
    const couponToEdit = coupons.find((c) => c.id === id);
    if (couponToEdit) {
      setEditingCoupon(couponToEdit);
      setIsModalOpen(true);
    }
  };

  const handleOpenAddModal = () => {
    setEditingCoupon(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleDelete = (id: string) => {
    setCouponToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (couponToDelete) {
      deleteCouponMutation.mutate(couponToDelete);
    }
    handleCloseDeleteModal();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCouponToDelete(null);
  };

  const handleSubmit = (data: CouponFormData) => {
    const couponPayload = {
      description: data.description,
      discountType: data.discountType,
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
      createCouponMutation.mutate(couponPayload as CreateCouponDto);
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
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <AddCouponModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={editingCoupon}
        />
      )}
      <DeleteCouponModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
