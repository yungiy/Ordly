import type { Metadata } from 'next';
import '../styles/globals.css';
import { AuthProvider } from '@/components/providers/auth.provider';
import QueryProvider from '@/components/providers/query.provider';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Ordly',
    default: 'Ordly - 스마트한 오더 시스템',
  },
  description: 'Ordly는 빠른 걸제와 오더 시스템을 제공합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className}`}>
        <AuthProvider>
          <QueryProvider>
            {children}
            <div id='modal-root' />
            <div id='toast-root' />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
