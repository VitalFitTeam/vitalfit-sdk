import { Client } from '../client';
import type { DataResponse, BranchInfo } from '@/types';

export class PublicService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.getBranchMap = this.getBranchMap.bind(this);
  }

  async getBranchMap(jwt: string): Promise<DataResponse<BranchInfo[]>> {
    const response = await this.client.get({
      url: '/public/branches-map',
      jwt,
    });

    return response as unknown as DataResponse<BranchInfo[]>;
  }
}
