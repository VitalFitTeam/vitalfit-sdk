import type {
  AttendanceHistory,
  CheckIn,
  CheckInResponse,
  PaginatedTotal,
  PaginationRequest,
  ServiceUsage,
} from '@/types';
import { Client } from '../client';

export class AccessService {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
    this.checkIn = this.checkIn.bind(this);
    this.getClientAttendanceHistory =
      this.getClientAttendanceHistory.bind(this);
    this.getClientServiceUsage = this.getClientServiceUsage.bind(this);
  }

  async checkIn(jwt: string, data: CheckIn): Promise<CheckInResponse> {
    const response = await this.client.post({
      url: '/access/check-in',
      jwt,
      data,
    });
    return response as unknown as CheckInResponse;
  }

  async getClientAttendanceHistory(
    jwt: string,
    userId: string,
    start?: string,
    end?: string,
    { page = 1, limit = 10, sort = 'desc' }: PaginationRequest = {},
  ): Promise<PaginatedTotal<AttendanceHistory[]>> {
    const response = await this.client.get({
      url: `/clients/${userId}/attendance-history`,
      jwt,
      params: {
        start_date: start,
        end_date: end,
        page,
        limit,
        sort,
      },
    });
    return response as unknown as PaginatedTotal<AttendanceHistory[]>;
  }

  async getClientServiceUsage(
    jwt: string,
    userId: string,
    start?: string,
    end?: string,
    { page = 1, limit = 10, sort = 'desc' }: PaginationRequest = {},
  ): Promise<PaginatedTotal<ServiceUsage[]>> {
    const response = await this.client.get({
      url: `/clients/${userId}/service-usage`,
      jwt,
      params: {
        start_date: start,
        end_date: end,
        page,
        limit,
        sort,
      },
    });
    return response as unknown as PaginatedTotal<ServiceUsage[]>;
  }
}
