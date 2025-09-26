import { RegisterRequest } from '@/types/types';

export const registerApi = async (data: RegisterRequest) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || '회원가입에 실패했습니다.');
  }

  return res.json();
};
