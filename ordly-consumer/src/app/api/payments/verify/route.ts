import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { imp_uid } = await req.json();

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

    const { amount: paidAmount, status: iamportStatus } =
      paymentDataResult.response;
    /*
      TODO: 실제 프로덕션에서는 DB에 저장된 주문 정보를 조회하여 결제 금액을 비교
      const order = await prisma.order.findUnique({ where: { merchantUid: merchant_uid } });
      const amountToBePaid = order.amount;
      if (paidAmount !== amountToBePaid) {
      // 결제 위변조로 간주하고 결제 취소 로직을 호출
      return NextResponse.json({ status: 'forgery', message: '결제 위변조가 의심됩니다.' }, { status: 400 });
      }
    */

    if (iamportStatus === 'paid') {
      // console.log('결제 검증 성공. DB 업데이트 로직 실행 (현재는 생략됨)');

      return NextResponse.json({
        status: 'success',
        message: '결제가 성공적으로 검증되었습니다.',
      });
    }

    return NextResponse.json(
      { status: 'failed', message: '결제가 완료되지 않았습니다.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('결제 검증 중 서버 오류 발생:', error);
    return NextResponse.json(
      { status: 'error', message: '서버 오류로 결제 검증에 실패했습니다.' },
      { status: 500 }
    );
  }
}
