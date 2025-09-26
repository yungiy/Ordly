import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, phone, password } = await req.json();
    if (!name || !phone || !password) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 전화번호 형식 유효성 검사
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: '유효한 연락처 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { name },
    });
    if (existingAdmin) {
      return NextResponse.json(
        { message: '이미 사용 중인 이름입니다.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.admin.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
