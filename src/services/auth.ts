import { Client } from '../client';
import type { LoginRequest, LoginResponse, SignUpRequest } from '@/types';

export class AuthService {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signUpStaff = this.signUpStaff.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyStaff = this.verifyStaff.bind(this);

    this.logout = this.logout.bind(this);
    this.saveJWT = this.saveJWT.bind(this);
  }

  async login({
    email,
    password,
    context,
  }: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post({
      url: '/auth/login',
      data: {
        email,
        password,
        context,
      },
    });
    return response as unknown as LoginResponse;
  }

  logout(): void {
    this.client.removeJWT();
  }

  saveJWT(jwt: string): void {
    this.client.setJWT(jwt);
  }

  async signUp(signUpData: SignUpRequest): Promise<void> {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (signUpData.role_name != 'client') {
      throw new Error('Only clients can sign up using this method');
    }
    if (!birthDateRegex.test(signUpData.birth_date)) {
      throw new Error('Birth date must be in the format YYYY-MM-DD');
    }
    await this.client.post({
      url: '/auth/register',
      data: signUpData,
    });
  }

  async signUpStaff(signUpData: SignUpRequest): Promise<void> {
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDateRegex.test(signUpData.birth_date)) {
      throw new Error('Birth date must be in the format YYYY-MM-DD');
    }
    await this.client.post({
      url: '/auth/register-staff',
      data: signUpData,
    });
  }
  async forgotPassword(email: string): Promise<void> {
    await this.client.post({
      url: '/auth/password/forgot',
      data: {
        email,
      },
    });
  }

  async resetPassword(
    otp: string,
    password: string,
    repeatPassword: string,
  ): Promise<void> {
    await this.client.post({
      url: '/auth/password/reset',
      data: {
        otp,
        password,
        repeatPassword,
      },
    });
  }

  async verifyEmail(otp: string): Promise<void> {
    await this.client.post({
      url: '/auth/activate',
      data: {
        otp,
      },
    });
  }

  async verifyStaff(
    token: string,
    password: string,
    repeatPassword: string,
  ): Promise<void> {
    await this.client.put({
      url: `/auth/activate/${token}`,
      data: {
        password,
        repeatPassword,
      },
    });
  }
}
