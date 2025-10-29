import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import { useToastStore } from '@/store/toast.store';
import { createOrder, verifyPayment } from '../features/pay/pay.api';
import type { Iamport, IamportRequest, IamportResponse } from '@/types/iamport';

const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID!;

export function usePayment() {
  const { items, clearCart } = useCartStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  const iamportKey = process.env.NEXT_PUBLIC_IAMPORT_KEY;

  const handlePaymentResponse = (rsp: IamportResponse) => {
    if (rsp.success) {
      verifyPaymentMutation.mutate({
        imp_uid: rsp.imp_uid,
        merchant_uid: rsp.merchant_uid,
      });
    } else {
      showToast(`결제에 실패했습니다: ${rsp.error_msg}`);
    }
  };

  const requestPayment = (orderData: { merchant_uid: string; amount: number }) => {
    if (!window.IMP || !iamportKey) {
      showToast('결제 모듈을 로드할 수 없습니다.');
      return;
    }

    const { merchant_uid, amount } = orderData;
    const itemName =
      items.length > 1
        ? `${items[0].title} 외 ${items.length - 1}건`
        : items[0].title;

    window.IMP.init(iamportKey);
    const paymentData: IamportRequest = {
      pg: 'nice',
      pay_method: 'card',
      merchant_uid,
      name: itemName,
      amount,
      buyer_name: '테스트 구매자',
      buyer_tel: '010-1234-5678',
      buyer_email: 'test@example.com',
    };

    window.IMP.request_pay(paymentData, handlePaymentResponse);
  };

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (data, variables) => {
      if (data.status === 'success') {
        clearCart();
        router.push(
          `/pay/complete?merchant_uid=${variables.merchant_uid}&imp_uid=${variables.imp_uid}`,
        );
      } else {
        showToast('결제 검증에 실패했습니다.');
      }
    },
    onError: () => {
      showToast('결제 검증 중 오류가 발생했습니다.');
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: requestPayment,
    onError: (error) => {
      showToast(error.message);
    },
  });

  const startPayment = () => {
    if (items.length === 0) {
      showToast('장바구니가 비어있습니다.');
      return;
    }

    const orderPayload = {
      items: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtOrder: item.price,
      })),
      storeId: STORE_ID,
    };
    createOrderMutation.mutate(orderPayload);
  };

  const isProcessing =
    createOrderMutation.isPending || verifyPaymentMutation.isPending;

  return { startPayment, isProcessing };
}