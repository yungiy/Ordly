import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cuid from 'cuid';

export async function POST(req: NextRequest) {
  const { imp_uid, merchant_uid } = await req.json();

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
        { status: 'error', message: '결제 서버 인증에 실패했습니다.' },
        { status: 500 }
      );
    }
    const { access_token } = tokenResult.response;

    const getPaymentDataResponse = await fetch(
      `https://api.iamport.kr/payments/${imp_uid}`,
      { headers: { Authorization: access_token } }
    );
    const paymentDataResult = await getPaymentDataResponse.json();

    if (paymentDataResult.code !== 0) {
      return NextResponse.json(
        { status: 'error', message: '결제 정보 조회에 실패했습니다.' },
        { status: 400 }
      );
    }

    const {
      amount: paidAmount,
      status: iamportStatus,
      pay_method: method,
    } = paymentDataResult.response;

    const order = await prisma.order.findUnique({
      where: { orderNumber: merchant_uid },
    });

    if (!order) {
      // TODO: 해당 주문이 없으면 결제 취소 로직 호출
      return NextResponse.json(
        { status: 'error', message: '주문 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const amountToBePaid = order.totalPrice;

    if (paidAmount !== amountToBePaid.toNumber()) {
      return NextResponse.json(
        { status: 'forgery', message: '결제 위조가 의심됩니다.' },
        { status: 400 }
      );
    }

    if (iamportStatus === 'paid') {
      await prisma.$transaction([
        prisma.payment.create({
          data: {
            id: cuid(),
            amount: paidAmount,
            method: method,
            status: 'SUCCESS',
            impUid: imp_uid,
            merchantUid: merchant_uid,
            orderId: order.id,
          },
        }),
        prisma.order.update({
          where: { id: order.id },
          data: {
            updatedAt: new Date(),
            status: 'PREPARING',
          },
        }),
      ]);

      return NextResponse.json({
        status: 'success',
        message: '결제가 성공적으로 처리되었습니다.',
      });
    }

    return NextResponse.json(
      { status: 'failed', message: '결제가 완료되지 않았습니다.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 오류로 결제 검증에 실패했습니다.' },
      { status: 500 }
    );
  }
}
