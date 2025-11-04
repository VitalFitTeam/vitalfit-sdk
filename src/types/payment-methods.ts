export type PaymentMethod = {
  method_id: string;
  name: string;
  type: string;
  description: string;
  processing_type: string;
  global_status: boolean;
  created_at: string;
  updated_at: string;
};

export type PaymentMethodTypes = {};

export type CreatePaymentMethod = {
  description: string;
  name: string;
  processing_type: 'Gateway' | 'Offline';
  type: 'Cash' | 'Card' | 'Transfer' | 'Other';
};
