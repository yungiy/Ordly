import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  // 1. 클라이언트로부터 imp_uid와 merchant_uid를 받습니다.
  const { imp_uid, merchant_uid } = await req.json();

  try {
    // 2. 아임포트 API 토큰 발급
    const getTokenResponse = await fetch(
      'https://api.iamport.kr/users/getToken',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imp_key: process.env.IAMPORT_API_KEY, // REST API 키
          imp_secret: process.env.IAMPORT_API_SECRET, // REST API Secret
        }),
      }
    );

    const tokenResult = await getTokenResponse.json();
    if (tokenResult.code !== 0) {
      console.error('아임포트 토큰 발급 실패:', tokenResult.message);
      return NextResponse.json(
        { status: 'error', message: '결제 서버 인증에 실패했습니다.' },
        { status: 500 }
      );
    }
    const { access_token } = tokenResult.response;

    // 3. imp_uid로 아임포트 서버에서 결제 정보 조회
    const getPaymentDataResponse = await fetch(
      `https://api.iamport.kr/payments/${imp_uid}`,
      { headers: { Authorization: access_token } }
    );
    const paymentDataResult = await getPaymentDataResponse.json();

    if (paymentDataResult.code !== 0) {
      console.error('아임포트 결제 정보 조회 실패:', paymentDataResult.message);
      return NextResponse.json(
        { status: 'error', message: '결제 정보 조회에 실패했습니다.' },
        { status: 400 }
      );
    }

    const { amount: paidAmount, status: iamportStatus } =
      paymentDataResult.response;

    // 4. 결제 상태 확인
    // 금액 비교 및 DB 업데이트 로직을 제거하고, 아임포트 결제 상태만 확인합니다.
    if (iamportStatus === 'paid') {
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