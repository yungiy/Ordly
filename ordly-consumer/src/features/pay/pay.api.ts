interface OrderItem {
  menuItemId: string;
  quantity: number;
  priceAtOrder: number;
}

interface CreateOrderParams {
  items: OrderItem[];
  storeId: string;
}

interface CreateOrderResponse {
  merchant_uid: string;
  amount: number;
}

export const createOrder = async (
  params: CreateOrderParams
): Promise<CreateOrderResponse> => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '주문 생성에 실패했습니다.');
  }

  return response.json();
};

interface VerifyPaymentParams {
  imp_uid: string;
  merchant_uid: string;
}

export const verifyPayment = async (params: VerifyPaymentParams) => {
  const response = await fetch('/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return response.json();
};

interface CancelPaymentParams {
  imp_uid: string;
  reason: string;
}

interface CancelPaymentResponse {
  code: number;
  message: string;
  response?: any;
}

export const cancelPayment = async ({
  imp_uid,
  reason,
}: CancelPaymentParams): Promise<CancelPaymentResponse> => {
  const response = await fetch('/api/payments/cancel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imp_uid, reason }),
  });

  const result = await response.json();
  return result;
};