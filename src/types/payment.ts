export type CreateInvoiceItem = {
  item_id: string;
  item_type: 'membership' | 'service' | 'package' | string;
  quantity: number;
};

export type CreateInvoicePayload = {
  branch_id: string;
  items: CreateInvoiceItem[];
  user_id: string | null;
};

export type CreateInvoiceResponse = {
  invoice_id: string;
  message: string;
};

export type AddPaymentToInvoicePayload = {
  amount_paid: number;
  currency_paid: string;
  invoice_id: string;
  payment_method_id: string;
  receipt_url: string;
  transaction_id: string;
};

export type AddPaymentToInvoiceResponse = {
  message: string;
  payment_id: string;
};
