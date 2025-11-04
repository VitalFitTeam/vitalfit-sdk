import { Client } from './client';
import {
  AuthService,
  UserService,
  BranchService,
  PaymentMethodService,
  InstructorService,
} from './services';

export class VitalFit {
  private static instance: VitalFit;
  client: Client;
  auth: AuthService;
  user: UserService;
  branch: BranchService;
  paymentMethod: PaymentMethodService;
  instructor: InstructorService;

  constructor(isDevMode: boolean, origin?: string) {
    this.client = new Client(isDevMode, origin);
    this.auth = new AuthService(this.client);
    this.user = new UserService(this.client);
    this.branch = new BranchService(this.client);
    this.paymentMethod = new PaymentMethodService(this.client);
    this.instructor = new InstructorService(this.client);
  }

  static getInstance(isDevMode = false): VitalFit {
    if (!VitalFit.instance) {
      VitalFit.instance = new VitalFit(isDevMode);
    }
    return VitalFit.instance;
  }

  version(): string {
    return '0.0.31';
  }
}

export * from './types';
export * from './errors';
