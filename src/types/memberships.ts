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
