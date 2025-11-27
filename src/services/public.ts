import { Client } from '../client';
import type {
  DataResponse,
  BranchInfo,
  ServicePublicItem,
  PublicPaginationService,
  PaginatedTotal,
} from '@/types';

export class PublicService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.getBranchMap = this.getBranchMap.bind(this);
    this.getServices = this.getServices.bind(this);
  }

  async getBranchMap(jwt: string): Promise<DataResponse<BranchInfo[]>> {
    const response = await this.client.get({
      url: '/public/branches-map',
      jwt,
    });

    return response as unknown as DataResponse<BranchInfo[]>;
  }
  async getServices({
    page = 1,
    limit = 10,
    currency,
    category,
    price,
    sortby,
    search,
    sort = 'desc',
  }: PublicPaginationService): Promise<PaginatedTotal<ServicePublicItem[]>> {
    const response = await this.client.get({
      url: '/public/services',
      params: {
        page,
        limit,
        currency,
        category,
        price,
        sortby,
        search,
        sort,
      },
    });
    return response as unknown as PaginatedTotal<ServicePublicItem[]>;
  }
}
