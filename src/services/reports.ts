import { Client } from '@/client';
import type { ChartData, DataResponse, TopBranch } from '@/types';

export class ReportService {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this.mostUsedServices = this.mostUsedServices.bind(this);
    this.salesByCategory = this.salesByCategory.bind(this);
    this.salesByHour = this.salesByHour.bind(this);
    this.salesByPaymentMethod = this.salesByPaymentMethod.bind(this);
    this.topInstructors = this.topInstructors.bind(this);
    this.topBranches = this.topBranches.bind(this);
    this.globalStats = this.globalStats.bind(this);
    this.totalActiveBranches = this.totalActiveBranches.bind(this);
    this.totalClients = this.totalClients.bind(this);
  }
  async mostUsedServices(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/most-used-services',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByCategory(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-category',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByHour(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-hour',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async salesByPaymentMethod(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-payment-method',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async topInstructors(
    jwt: string,
    start: string,
    end: string,
  ): Promise<DataResponse<ChartData[]>> {
    const response = await this.client.get({
      url: '/reports/charts/sales-by-payment-method',
      jwt,
      params: {
        start,
        end,
      },
    });
    return response as unknown as DataResponse<ChartData[]>;
  }
  async topBranches(jwt: string): Promise<DataResponse<TopBranch[]>> {
    const response = await this.client.get({
      url: '/reports/stats/top-branches',
      jwt,
    });
    return response as unknown as DataResponse<TopBranch[]>;
  }
  async globalStats(jwt: string): Promise<DataResponse<TopBranch[]>> {
    const response = await this.client.get({
      url: '/reports/stats/global',
      jwt,
    });
    return response as unknown as DataResponse<TopBranch[]>;
  }
  async totalActiveBranches(jwt: string): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/total-active-branches',
      jwt,
    });
    return response as unknown as DataResponse<number>;
  }
  async totalClients(jwt: string): Promise<DataResponse<number>> {
    const response = await this.client.get({
      url: '/reports/stats/total-clients',
      jwt,
    });
    return response as unknown as DataResponse<number>;
  }
}
