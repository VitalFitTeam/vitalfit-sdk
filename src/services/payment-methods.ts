import { Client } from '../client';
import type { DataResponse, PaymentMethod } from '../types';

export class PaymentMethodService {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.getPaymentMethods = this.getPaymentMethods.bind(this);
    }

    async getPaymentMethods(jwt:string): Promise<DataResponse<PaymentMethod[]>> {
        const response = await this.client.get({
            url: '/branches/payment-methods',
            jwt
        });
        return response as unknown as DataResponse<PaymentMethod[]>;
    }
}








