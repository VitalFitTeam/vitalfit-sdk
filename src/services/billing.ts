import type { CreateInvoicePayload, CreateInvoiceResponse } from '@/types';
import { Client } from '../client';

export class BillingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createInvoice = this.createInvoice.bind(this);
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
}
