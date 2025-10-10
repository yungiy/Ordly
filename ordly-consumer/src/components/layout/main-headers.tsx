import CouponBanner from '@/features/coupon/coupon-banner';
import StoreBanner from '@/features/store/store-banner';
import StoreProfile from '@/features/store/store-profile';

export default function MainHeaders() {
  return (
    <header className='bg-white pb-2'>
      <StoreBanner />
      <div className='px-4 pt-4'>
        <StoreProfile />
        <CouponBanner />
      </div>
    </header>
  );
}
