'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { createSupabaseUrl } from '@/utils/create-supabase-url';

type Props = {
  src: string;
  alt: string;
};

export default function MenuImage({ src, alt }: Props) {
  const router = useRouter();

  return (
    <div className="relative h-80 w-full">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ChevronLeft size={24} />
      </button>
      <Image src={createSupabaseUrl(src)} alt={alt} fill className='object-cover' />
    </div>
  );
}
