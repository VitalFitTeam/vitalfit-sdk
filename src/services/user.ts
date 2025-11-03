import { Client } from '@/client';
import type {
  UserApiResponse,
  DataResponse,
  User,
  UserPaginationOptions,
} from '@/types';

export class UserService {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this.WhoAmI = this.WhoAmI.bind(this);
    this.getBranchAdmins = this.getBranchAdmins.bind(this);
    this.getClientUsers = this.getClientUsers.bind(this);
    this.getStaffUsers = this.getStaffUsers.bind(this);
  }

  async getStaffUsers(
    { page = 1, limit = 10, sort, search, role }: UserPaginationOptions,
    jwt: string,
  ): Promise<DataResponse<User[]>> {
    const paramsToSend = {
      page,
      limit,
      sort,
      search,
      role,
    };

    const response = await this.client.get({
      url: '/user/users',
      jwt,
      params: paramsToSend,
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
}
