export interface IamportRequest {
  pg?: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_email?: string;
}

export interface IamportResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_msg?: string;
}

export interface Iamport {
  init: (key: string) => void;
  request_pay: (params: IamportRequest, callback: (rsp: IamportResponse) => void) => void;
}