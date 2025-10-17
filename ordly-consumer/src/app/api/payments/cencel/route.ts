import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { imp_uid, reason, cancel_request_amount } = await req.json();

  try {
    const getTokenResponse = await fetch('https://api.iamport.kr/users/getToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_API_SECRET,
      }),
    });

    const tokenResult = await getTokenResponse.json();
    if (tokenResult.code !== 0) {
      console.error('아임포트 토큰 발급 실패:', tokenResult.message);
      return NextResponse.json({ status: 'error', message: '서버 인증에 실패했습니다.' }, { status: 500 });
    }
    const { access_token } = tokenResult.response;

    const cancelPaymentResponse = await fetch('https://api.iamport.kr/payments/cancel', {
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
    });

    const cancelResult = await cancelPaymentResponse.json();

    // TODO: DB에서 해당 주문의 상태를 'CANCELED'로 업데이트하는 로직을 구현
    // await updateOrderStatusToCanceled(imp_uid);

    // 클라이언트에 취소 결과를 반환
    return NextResponse.json(cancelResult);

  } catch (error) {
    console.error('Payment cancellation error:', error);
    return NextResponse.json({ message: '결제 취소 중 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}