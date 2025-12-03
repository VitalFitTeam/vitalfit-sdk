import { Client } from '@/client';
import type {
  UserApiResponse,
  DataResponse,
  User,
  UserPaginationOptions,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserStaffRequest,
  QrToken,
} from '@/types';

export class UserService {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this.WhoAmI = this.WhoAmI.bind(this);
    this.getBranchAdmins = this.getBranchAdmins.bind(this);
    this.getClientUsers = this.getClientUsers.bind(this);
    this.getStaffUsers = this.getStaffUsers.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.QrToken = this.QrToken.bind(this);

    this.GetUserByID = this.GetUserByID.bind(this);
    this.updateUserClient = this.updateUserClient.bind(this);
    this.updateUserStaff = this.updateUserStaff.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async getStaffUsers(
    { search, role }: UserPaginationOptions,
    jwt: string,
  ): Promise<DataResponse<User[]>> {
    const response = await this.client.get({
      url: '/user/users',
      jwt,
      params: {
        search,
        role,
      },
    });

    return response as unknown as DataResponse<User[]>;
  }

  async WhoAmI(jwt: string): Promise<UserApiResponse> {
    const response = await this.client.get({
      url: '/user/whoami',
      jwt,
    });
    return response as unknown as UserApiResponse;
  }
  async getBranchAdmins(jwt: string): Promise<DataResponse<User[]>> {
    const response = await this.client.get({
      url: '/user/branch-admins',
      jwt,
    });
    return response as unknown as DataResponse<User[]>;
  }

  async getClientUsers(
    jwt: string,
    options: UserPaginationOptions = {},
  ): Promise<DataResponse<User[]>> {
    const response = await this.client.get({
      url: '/user/clients',
      jwt,
      params: options,
    });
    return response as unknown as DataResponse<User[]>;
  }

  async GetUserByID(
    userId: string,
    jwt: string,
  ): Promise<DataResponse<GetUserResponse>> {
    const response = await this.client.get({
      url: `/user/${userId}`,
      jwt,
    });
    return response as unknown as DataResponse<GetUserResponse>;
  }

  async updateUserClient(
    userId: string,
    data: UpdateUserRequest,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/user/${userId}/client`,
      jwt,
      data,
    });
  }
  async updateUserStaff(
    userId: string,
    data: UpdateUserStaffRequest,
    jwt: string,
  ): Promise<void> {
    await this.client.put({
      url: `/user/${userId}/staff`,
      jwt,
      data,
    });
  }

  async deleteUser(userId: string, jwt: string): Promise<void> {
    await this.client.delete({
      url: `/user/${userId}`,
      jwt,
    });
  }

  async getUserByEmail(
    email: string,
    jwt: string,
  ): Promise<DataResponse<User>> {
    const response = await this.client.post({
      url: `/user/by-email`,
      jwt,
      data: {
        email: email,
      },
    });
    return response as unknown as DataResponse<User>;
  }

  async QrToken(jwt: string): Promise<QrToken> {
    const response = await this.client.get({
      url: `/user/qr-token`,
      jwt,
    });
    return response;
  }
}
