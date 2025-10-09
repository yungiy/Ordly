import { Coupon } from '@prisma/client';

const API_BASE_URL = '/api';

export type CreateCouponDto = {
  description: string;
  discountType: 'FIXED_AMOUNT' | 'PERCENTAGE';
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
};
export type UpdateCouponDto = Partial<CreateCouponDto> & { isActive?: boolean };

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  if (response.status === 204) {
    return {} as T;
  }
  return response.json();
}

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await fetch(`${API_BASE_URL}/coupons`);
  return handleResponse<Coupon[]>(response);
};

export const createCoupon = async (
  couponData: CreateCouponDto
): Promise<Coupon> => {
  const response = await fetch(`${API_BASE_URL}/coupons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(couponData),
  });
  return handleResponse<Coupon>(response);
};

export const updateCoupon = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateCouponDto;
}): Promise<Coupon> => {
  const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Coupon>(response);
};

export const deleteCoupon = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/coupons/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
};
