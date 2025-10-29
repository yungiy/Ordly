import { Suspense } from 'react';
import PayCompleteClient from './pay-complete-client';
import PayLoadingSkeleton from '@/components/skeleton/pay-loading-skeleton';

export default function PayCompletePage() {
  return (
    <Suspense fallback={<PayLoadingSkeleton />}>
      <PayCompleteClient />
    </Suspense>
  );
}
