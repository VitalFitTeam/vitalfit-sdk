import type {
  AttendanceHistory,
  CheckIn,
  CheckInResponse,
  DataResponse,
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
    this.checkInManual = this.checkInManual.bind(this);
    this.getClientAttendanceHistory =
      this.getClientAttendanceHistory.bind(this);
    this.getClientServiceUsage = this.getClientServiceUsage.bind(this);
    this.getClassAttendanceHistory = this.getClassAttendanceHistory.bind(this);
  }

  async checkIn(jwt: string, data: CheckIn): Promise<CheckInResponse> {
    const response = await this.client.post({
      url: '/access/check-in',
      jwt,
      data,
    });
    return response as unknown as CheckInResponse;
  }

  async checkInManual(jwt: string, data: CheckIn): Promise<CheckInResponse> {
    const response = await this.client.post({
      url: '/access/check-in/manual',
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

  async getClassAttendanceHistory(
    jwt: string,
    classId: string,
    start?: string,
    end?: string,
    status?: 'Attended' | 'NoShow' | 'Cancelled',
  ): Promise<DataResponse<AttendanceHistory[]>> {
    const response = await this.client.get({
      url: `/access/classes/${classId}/attendance`,
      jwt,
      params: {
        start_date: start,
        end_date: end,
        status,
      },
    });
    return response as unknown as DataResponse<AttendanceHistory[]>;
  }
}
