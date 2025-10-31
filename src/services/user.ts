import { Client } from '@/client';
import type { UserApiResponse, DataResponse, User } from '@/types';

export class UserService {
  client: Client;
  constructor(client: Client) {
    this.client = client;
    this.WhoAmI = this.WhoAmI.bind(this);
    this.getBranchAdmins = this.getBranchAdmins.bind(this);
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
}
