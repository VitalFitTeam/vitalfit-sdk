import { Client } from '../client';
import type {
  CreateService,
  DataResponse,
  ServiceCategoryInfo,
  ServiceFullDetail,
  UpdateServiceManual,
} from '@/types';

export class ProductsService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createService = this.createService.bind(this);
    this.getServices = this.getServices.bind(this);
    this.getServiceByID = this.getServiceByID.bind(this);
    this.updateService = this.updateService.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }
  async createService(data: CreateService, jwt: string): Promise<void> {
    await this.client.post({
      url: '/services',
      jwt,
      data,
    });
  }

  async getServices(jwt: string): Promise<DataResponse<ServiceFullDetail[]>> {
    const response = await this.client.get({
      url: '/services',
      jwt,
    });
    return response as unknown as DataResponse<ServiceFullDetail[]>;
  }
  async getServiceByID(
    serviceId: string,
    jwt: string,
  ): Promise<DataResponse<ServiceFullDetail>> {
    const response = await this.client.get({
      url: `/services/${serviceId}`,
      jwt,
    });
    return response as unknown as DataResponse<ServiceFullDetail>;
  }

  async updateService(
    serviceId: string,
    data: UpdateServiceManual,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/services/${serviceId}`,
      jwt,
      data,
    });
  }
  async deleteService(serviceId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/services/${serviceId}`,
      jwt,
    });
  }
  async getCategories(
    jwt: string,
  ): Promise<DataResponse<ServiceCategoryInfo[]>> {
    const response = await this.client.get({
      url: '/services/categories',
      jwt,
    });
    return response as unknown as DataResponse<ServiceCategoryInfo[]>;
  }
}
