
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/auth/register
 * 새로운 관리자(Admin)를 등록합니다.
 * @param {Request} req - 요청 객체
 * @body {string} name - 관리자 이름 (로그인 시 ID로 사용)
 * @body {string} phone - 전화번호
 * @body {string} password - 비밀번호
 */
export async function POST(req: Request) {
  try {
    const { name, phone, password } = await req.json();

    // 1. 입력 값 검증
    if (!name || !phone || !password) {
      return NextResponse.json({ message: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    // 2. 관리자 이름 중복 확인
    const existingAdmin = await prisma.admin.findUnique({
      where: { name },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: '이미 사용 중인 이름입니다.' }, { status: 409 });
    }

    // 3. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. 새로운 Admin 생성
    await prisma.admin.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: '회원가입이 완료되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
