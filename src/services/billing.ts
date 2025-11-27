import type {
  AddPaymentToInvoicePayload,
  AddPaymentToInvoiceResponse,
  CreateInvoicePayload,
  CreateInvoiceResponse,
  DataResponse,
  InvoiceDetail,
  PaymentDetail,
} from '@/types';
import { Client } from '../client';

export class BillingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createInvoice = this.createInvoice.bind(this);
    this.AddPaymentToInvoice = this.AddPaymentToInvoice.bind(this);
    this.getInvoiceByID = this.getInvoiceByID.bind(this);
    this.getPaymentByID = this.getPaymentByID.bind(this);
    this.updatePaymentStatus = this.updatePaymentStatus.bind(this);
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
  async getInvoiceByID(
    invoiceId: string,
    jwt: string,
  ): Promise<DataResponse<InvoiceDetail>> {
    const response = await this.client.get({
      url: `/billing/invoices/${invoiceId}`,
      jwt,
    });
    return response as unknown as DataResponse<InvoiceDetail>;
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

  async getPaymentByID(
    paymentId: string,
    jwt: string,
  ): Promise<DataResponse<PaymentDetail>> {
    const response = await this.client.get({
      url: `/billing/payments/${paymentId}`,
      jwt,
    });
    return response as unknown as DataResponse<PaymentDetail>;
  }
  async updatePaymentStatus(
    paymentId: string,
    status: string,
    jwt: string,
  ): Promise<void> {
    await this.client.patch({
      url: `/billing/payments/${paymentId}/status`,
      jwt,
      data: {
        status: status,
      },
    });
  }
}
