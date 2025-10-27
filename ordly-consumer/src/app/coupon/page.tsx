import Header from '@/components/layout/header';
import CouponPageClient from '@/features/coupon/coupon-page';
import { Coupon } from '@/features/coupon/coupon-item';
import { DiscountType } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const getCoupons = async (): Promise<Coupon[]> => {
  const coupons = await prisma.coupon.findMany({
    where: {
      isActive: true,
      validUntil: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      discountType: true,
      discountValue: true,
      validFrom: true,
      validUntil: true,
      isActive: true,
    },
  });

   return coupons.map((coupon) => {
    const today = new Date();
    const validUntil = new Date(coupon.validUntil);
    const diffTime = Math.abs(validUntil.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: coupon.id,
      dDay: `D-${diffDays}`,
      amount: coupon.discountValue.toString(),
      currency: coupon.discountType === DiscountType.FIXED_AMOUNT ? '원' : '%',
      title: coupon.title,
      description: coupon.description,
      startDate: new Date(coupon.validFrom).toLocaleDateString(),
      endDate: validUntil.toLocaleDateString(),
    };
  });
};
export default async function Page() {
  const coupons = await getCoupons();
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header
        title='쿠폰'
        showBackButton
        rightContent={
          <Link
            href='my-coupon'
            className='text-sm text-gray-600 font-semibold'
          >
            보유한 쿠폰
          </Link>
        }
      />
      <main className='flex-grow p-4'>
        <CouponPageClient coupons={coupons} />
      </main>
    </div>
  );
}
