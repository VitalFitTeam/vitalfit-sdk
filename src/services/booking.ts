import type {
  BookClassRequest,
  BookingParticipant,
  BranchScheduleResponse,
  ClassBookingCount,
  ClientBookingResponse,
  DataResponse,
  PaginatedTotal,
} from '@/types';
import { Client } from '../client';
//booking
export class BookingService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.bookClass = this.bookClass.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.getClientBooking = this.getClientBooking.bind(this);
    this.getClientBranchBooking = this.getClientBranchBooking.bind(this);
    this.getClassBookingCount = this.getClassBookingCount.bind(this);
    this.getBookingClass = this.getBookingClass.bind(this);
  }

  async bookClass(
    data: BookClassRequest,
    classID: string,
    jwt: string,
  ): Promise<void> {
    await this.client.post({
      url: `/bookings/${classID}/book`,
      jwt,
      data,
    });
  }

  async cancelBooking(bookingId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/booking/${bookingId}/cancel`,
      jwt,
    });
  }

  async getClientBooking(
    userID: string,
    jwt: string,
  ): Promise<DataResponse<ClientBookingResponse[]>> {
    const response = await this.client.get({
      url: `/bookings/client/${userID}`,
      jwt,
    });
    return response as unknown as DataResponse<ClientBookingResponse[]>;
  }

  async getClientBranchBooking(
    branchID: string,
    userID: string,
    jwt: string,
  ): Promise<DataResponse<BranchScheduleResponse[]>> {
    const response = await this.client.get({
      url: `/schedule/branch/${branchID}/client/${userID}`,
      jwt,
    });
    return response as unknown as DataResponse<BranchScheduleResponse[]>;
  }
  async getClassBookingCount(
    classID: string,
    jwt: string,
  ): Promise<ClassBookingCount> {
    const response = await this.client.get({
      url: `/bookings/${classID}/count`,
      jwt,
    });
    return response as unknown as ClassBookingCount;
  }
  async getBookingClass(
    classID: string,
    jwt: string,
  ): Promise<PaginatedTotal<BookingParticipant>> {
    const response = await this.client.get({
      url: `/bookings/class/${classID}`,
      jwt,
    });
    return response as unknown as PaginatedTotal<BookingParticipant>;
  }
}
