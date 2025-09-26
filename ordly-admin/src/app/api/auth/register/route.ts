import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const {
      name,
      password,
      storeName,
      storeAddress,
      storePhone,
    } = await req.json();

    // 필수 정보 확인
    if (!name || !password || !storeName || !storeAddress || !storePhone) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 연락처 형식 검사
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(storePhone)) {
      return NextResponse.json(
        { message: '유효한 매장 연락처 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 사용자 및 매장 이름 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return NextResponse.json({ message: '이미 사용 중인 이름입니다.' }, { status: 409 });
    }

    const existingStore = await prisma.store.findUnique({
      where: { name: storeName },
    });

    if (existingStore) {
      return NextResponse.json(
        { message: '이미 사용 중인 매장 이름입니다.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // 사용자 및 매장 정보 동시 생성
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        store: {
          create: {
            name: storeName,
            address: storeAddress,
            phone: storePhone,
          },
        },
      },
      include: {
        store: true, // 생성된 매장 정보 포함
      },
    });

    return NextResponse.json(
      {
        message: '회원가입 및 매장 생성이 완료되었습니다.',
        user: {
          id: newUser.id,
          name: newUser.name,
          storeId: newUser.store.id,
          storeName: newUser.store.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register API Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: '입력한 정보가 이미 사용 중입니다.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
