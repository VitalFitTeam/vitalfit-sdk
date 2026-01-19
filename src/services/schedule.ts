import type {
  BranchClassInfo,
  CreateClassPayload,
  DataResponse,
  UpdateClassPayload,
} from '@/types';
import { Client } from '../client';

export class ScheduleService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.ListBranchesClass = this.ListBranchesClass.bind(this);
    this.CreateClass = this.CreateClass.bind(this);
    this.UpdateClass = this.UpdateClass.bind(this);
    this.DeleteClass = this.DeleteClass.bind(this);
    this.GetClassByID = this.GetClassByID.bind(this);
    this.GetClassesByInstructor = this.GetClassesByInstructor.bind(this);
  }

  async ListBranchesClass(
    branchID: string,
    jwt: string,
    month?: number,
    year?: number,
    date?: string,
  ): Promise<DataResponse<BranchClassInfo[]>> {
    const response = await this.client.get({
      url: `/branches/${branchID}/schedule`,
      jwt,
      params: {
        month,
        year,
        date,
      },
    });
    return response as unknown as DataResponse<BranchClassInfo[]>;
  }
  async CreateClass(
    branchID: string,
    data: CreateClassPayload,
    jwt: string,
  ): Promise<void> {
    await this.client.post({
      url: `/branches/${branchID}/schedule`,
      jwt,
      data,
    });
  }

  async GetClassByID(
    classID: string,
    jwt: string,
  ): Promise<DataResponse<BranchClassInfo>> {
    const response = await this.client.get({
      url: `/schedule/${classID}`,
      jwt,
    });
    return response as unknown as DataResponse<BranchClassInfo>;
  }

  async UpdateClass(
    classID: string,
    data: UpdateClassPayload,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/schedule/${classID}`,
      jwt,
      data,
    });
  }
  async DeleteClass(classID: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/schedule/${classID}`,
      jwt,
    });
  }

  async GetClassesByInstructor(
    jwt: string,
    userId?: string,
    month?: number,
    year?: number,
    date?: string,
  ): Promise<DataResponse<BranchClassInfo[]>> {
    const response = await this.client.get({
      url: '/schedule/instructor',
      jwt,
      params: {
        user_id: userId,
        month,
        year,
        date,
      },
    });
    return response as unknown as DataResponse<BranchClassInfo[]>;
  }
}
