import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { imp_uid, reason, cancel_request_amount } = await req.json();

  try {
    const getTokenResponse = await fetch(
      'https://api.iamport.kr/users/getToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imp_key: process.env.IAMPORT_API_KEY,
          imp_secret: process.env.IAMPORT_API_SECRET,
        }),
      }
    );

    const tokenResult = await getTokenResponse.json();
    if (tokenResult.code !== 0) {
      return NextResponse.json(
        { status: 'error', message: '서버 인증에 실패했습니다.' },
        { status: 500 }
      );
    }
    const { access_token } = tokenResult.response;

    const cancelPaymentResponse = await fetch(
      'https://api.iamport.kr/payments/cancel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token,
        },
        body: JSON.stringify({
          reason,
          imp_uid,
          amount: cancel_request_amount,
        }),
      }
    );

    const cancelResult = await cancelPaymentResponse.json();

    if (cancelResult.code === 0) {
      await prisma.payment.update({
        where: { impUid: imp_uid },
        data: {
          status: 'FAILED',
          Order: {
            update: {
              status: 'CANCELED',
            },
          },
        },
      });
    }

    return NextResponse.json(cancelResult);
  } catch (error) {
    return NextResponse.json(
      { message: '결제 취소 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
