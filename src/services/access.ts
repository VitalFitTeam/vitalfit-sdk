import type { CheckIn, CheckInResponse } from '@/types';
import { Client } from '../client';

export class AccessService {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
    this.checkIn = this.checkIn.bind(this);
  }
  async checkIn(jwt: string, data: CheckIn): Promise<CheckInResponse> {
    const response = await this.client.post({
      url: '/access/check-in',
      jwt,
      data,
    });
    return response as unknown as CheckInResponse;
  }
}
