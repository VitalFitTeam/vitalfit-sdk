import { Client } from '../client';
import type {
  CreatePaymentMethod,
  DataResponse,
  PaymentMethod,
} from '../types';

export class PaymentMethodService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.getPaymentMethods = this.getPaymentMethods.bind(this);
    this.getPaymentMethodByID = this.getPaymentMethodByID.bind(this);
    this.createPaymentMethod = this.createPaymentMethod.bind(this);
    this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
    this.deletePaymentMethod = this.deletePaymentMethod.bind(this);
  }

  async getPaymentMethods(jwt: string): Promise<DataResponse<PaymentMethod[]>> {
    const response = await this.client.get({
      url: '/billing/payment-methods',
      jwt,
    });
    return response as unknown as DataResponse<PaymentMethod[]>;
  }
  async createPaymentMethod(
    paymentMethodData: CreatePaymentMethod,
    jwt: string,
  ): Promise<void> {
    await this.client.post({
      url: '/billing/payment-methods',
      jwt,
      data: paymentMethodData,
    });
  }

  async getPaymentMethodByID(
    paymentMethodId: string,
    jwt: string,
  ): Promise<DataResponse<PaymentMethod>> {
    const response = await this.client.get({
      url: `/billing/payment-methods/${paymentMethodId}`,
      jwt,
    });
    return response as unknown as DataResponse<PaymentMethod>;
  }

  async updatePaymentMethod(
    paymentMethodId: string,
    data: CreatePaymentMethod,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/billing/payment-methods/${paymentMethodId}`,
      jwt,
      data,
    });
  }

  async deletePaymentMethod(
    paymentMethodId: string,
    jwt: string,
  ): Promise<void> {
    await this.client.delete({
      url: `/billing/payment-methods/${paymentMethodId}`,
      jwt,
    });
  }
}
