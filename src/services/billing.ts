import type {
  AddPaymentToInvoicePayload,
  AddPaymentToInvoiceResponse,
  CreateInvoicePayload,
  CreateInvoiceResponse,
} from '@/types';
import { Client } from '../client';

export class BillingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createInvoice = this.createInvoice.bind(this);
    this.AddPaymentToInvoice = this.AddPaymentToInvoice.bind(this);
  }
  async createInvoice(
    data: CreateInvoicePayload,
    jwt: string,
  ): Promise<CreateInvoiceResponse> {
    const response = await this.client.post({
      url: '/billing/invoices',
      jwt,
      data,
    });
    return response as unknown as CreateInvoiceResponse;
  }

  async AddPaymentToInvoice(
    data: AddPaymentToInvoicePayload,
    jwt: string,
  ): Promise<AddPaymentToInvoiceResponse> {
    const response = await this.client.post({
      url: '/billing/invoices/payment',
      jwt,
      data,
    });
    return response as unknown as AddPaymentToInvoiceResponse;
  }
}
