"use client";

import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import StorePage from '@/features/store/store-page';
import StoreSkeleton from '@/components/skeleton/store-skeleton';
import ErrorFallback from '@/components/common/error-fallback';

export default function StorePageClient() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<StoreSkeleton />}>
            <StorePage />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}