export type MembershipType = {
  description: string;
  duration_days: number;
  is_active: boolean;
  membership_type_id: string;
  name: string;
  price: number;
};

export type CreateMembershipType = {
  description: string;
  duration_days: number;
  is_active: boolean;
  name: string;
  price: number;
};

export type UpdateMembershipType = {
  description?: string;
  duration_days?: number;
  is_active?: boolean;
  name?: string;
  price?: number;
};

export type MembershipsSummary = {
  total: number;
  actives: number;
  inactives: number;
};

export type PublicMembershipResponse = {
  membership_type_id: string;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  base_currency: string;
  ref_price: string;
  ref_currency: string;
  is_active: boolean;
};
