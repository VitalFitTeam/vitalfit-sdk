import type {
  DataResponse,
  MembershipType,
  UpdateMembershipType,
} from '@/types';
import { Client } from '../client';

export class MembershipService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
    this.createMembershipType = this.createMembershipType.bind(this);
    this.getMembershipTypes = this.getMembershipTypes.bind(this);
    this.getMembershipTypeByID = this.getMembershipTypeByID.bind(this);
    this.updateMembershipType = this.updateMembershipType.bind(this);
    this.deleteMembershipType = this.deleteMembershipType.bind(this);
  }

  async createMembershipType(data: any, jwt: string): Promise<void> {
    await this.client.post({
      url: '/membership/types',
      jwt,
      data,
    });
  }

  async getMembershipTypes(
    jwt: string,
  ): Promise<DataResponse<MembershipType[]>> {
    const response = await this.client.get({
      url: '/membership/types',
      jwt,
    });
    return response as unknown as DataResponse<MembershipType[]>;
  }

  async getMembershipTypeByID(
    membershipTypeId: string,
    jwt: string,
  ): Promise<DataResponse<MembershipType>> {
    const response = await this.client.get({
      url: `/membership/types/${membershipTypeId}`,
      jwt,
    });
    return response as unknown as DataResponse<MembershipType>;
  }

  async updateMembershipType(
    membershipTypeId: string,
    data: UpdateMembershipType,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/membership/types/${membershipTypeId}`,
      jwt,
      data,
    });
  }

  async deleteMembershipType(
    membershipTypeId: string,
    jwt: string,
  ): Promise<void> {
    await this.client.delete({
      url: `/membership/types/${membershipTypeId}`,
      jwt,
    });
  }
}
