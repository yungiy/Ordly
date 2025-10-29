import type { Metadata } from 'next';
import '../style/globals.css';
import { ToastContainer } from '@/components/common/toast';
import SessionProvider from '@/components/providers/session.provider';
import QueryProvider from '@/components/providers/query.provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Ordly',
    default: 'Ordly - 스마트한 주문의 시작',
  },
  description: 'Ordly는 혁신적인 QR 주문 및 결제 솔루션을 제공합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='h-dvh w-screen content-center'>
        <QueryProvider>
          <SessionProvider>
            <main className='relative mx-auto flex h-full max-h-dvh w-full min-w-[360px] max-w-[400px] flex-col bg-white'>
              {children}
            </main>
            <ToastContainer />
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
