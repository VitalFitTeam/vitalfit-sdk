import { Client } from './client';
import {
  AuthService,
  UserService,
  BranchService,
  PaymentMethodService,
  InstructorService,
  RBACService,
  MembershipService,
  PublicService,
  EquipmentService,
} from './services';
import { MarketingService } from './services/marketing';
import { ProductsService } from './services/products';

export class VitalFit {
  private static instance: VitalFit;
  client: Client;
  auth: AuthService;
  user: UserService;
  branch: BranchService;
  paymentMethod: PaymentMethodService;
  instructor: InstructorService;
  RBAC: RBACService;
  marketing: MarketingService;
  membership: MembershipService;
  public: PublicService;
  products: ProductsService;
  equipment: EquipmentService;

  constructor(isDevMode: boolean, origin?: string) {
    this.client = new Client(isDevMode, origin);
    this.auth = new AuthService(this.client);
    this.user = new UserService(this.client);
    this.branch = new BranchService(this.client);
    this.paymentMethod = new PaymentMethodService(this.client);
    this.instructor = new InstructorService(this.client);
    this.RBAC = new RBACService(this.client);
    this.marketing = new MarketingService(this.client);
    this.membership = new MembershipService(this.client);
    this.public = new PublicService(this.client);
    this.products = new ProductsService(this.client);
    this.equipment = new EquipmentService(this.client);
  }

  static getInstance(isDevMode = false): VitalFit {
    if (!VitalFit.instance) {
      VitalFit.instance = new VitalFit(isDevMode);
    }
    return VitalFit.instance;
  }

  version(): string {
    return '0.0.55';
  }
}

export * from './types';
export * from './errors';
