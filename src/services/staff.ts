import type { BranchStaff, DataResponse, Staff } from '@/types';
import { Client } from '../client';

export class StaffService {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
    this.getStaffBranches = this.getStaffBranches.bind(this);
    this.getManagedBranches = this.getManagedBranches.bind(this);

    this.getBranchstaff = this.getBranchstaff.bind(this);
    this.AssignBranchStaff = this.AssignBranchStaff.bind(this);
    this.RemoveBranchStaff = this.RemoveBranchStaff.bind(this);
  }
  async getStaffBranches(jwt: string): Promise<DataResponse<BranchStaff[]>> {
    const response = await this.client.get({
      url: '/staff/branches',
      jwt,
    });
    return response as unknown as DataResponse<BranchStaff[]>;
  }
  async getManagedBranches(jwt: string): Promise<DataResponse<BranchStaff[]>> {
    const response = await this.client.get({
      url: '/staff/managed-branches',
      jwt,
    });
    return response as unknown as DataResponse<BranchStaff[]>;
  }

  async getBranchstaff(
    branchId: string,
    jwt: string,
  ): Promise<DataResponse<Staff[]>> {
    const response = await this.client.get({
      url: `/branches/${branchId}/staff`,
      jwt,
    });
    return response as unknown as DataResponse<Staff[]>;
  }

  async AssignBranchStaff(
    branchId: string,
    staffIds: string[],
    jwt: string,
  ): Promise<void> {
    await this.client.post({
      url: `/branches/${branchId}/staff`,
      jwt,
      data: {
        staff_ids: staffIds,
      },
    });
  }

  async RemoveBranchStaff(
    branchId: string,
    staffId: string,
    jwt: string,
  ): Promise<void> {
    await this.client.delete({
      url: `/branches/${branchId}/staff/${staffId}`,
      jwt,
    });
  }
}
