import type { PaymentMethod } from './payment-methods';
import type { PaginationRequest } from './utils';

export type PaginatedBranch = {
  branch_id: string;
  name: string;
  tax_id: string;
  state_name: string;
  country_name: string;
  manager_name: string;
  manager_last_name: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
};

export type BranchPaymentMethod = {
  branch_id: string;
  method_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  method: PaymentMethod;
};

export type OperatingHour = {
  hour_id?: string;
  day_of_week: string;
  branch_id?: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
};

export type BranchDetails = {
  branch_id: string;
  name: string;
  tax_id: string;
  address: string;
  latitude: number;
  longitude: number;
  max_capacity: number;
  phone: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  state: string;
  country: string;
  manager: string;
  manager_first_name: string;
  manager_last_name: string;
  operating_hours: OperatingHour[];
  payment_methods: BranchPaymentMethod[];
};

export type BranchStatusCount = {
  Active: number;
  Inactive: number;
  Maintenance: number;
  Total: number;
};

export type PaginationBranchRequest = PaginationRequest & {
  status?: string;
  location?: string;
};

export type CreateBranchRequest = {
  address: string;
  country: string;
  latitude: number;
  longitude: number;
  manager_id: string;
  max_capacity: number;
  name: string;
  operating_hours: OperatingHour[];
  payment_methods: string[];
  phone: string;
  state: string;
  status: string;
  tax_id: string;
};
