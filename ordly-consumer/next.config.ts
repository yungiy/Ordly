import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vbjnhbgklxjsppjuksad.supabase.co', // 여기에 Supabase 호스트 이름 추가
      },
    ],
  },
};

export default nextConfig;
