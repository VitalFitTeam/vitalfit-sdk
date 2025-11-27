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
