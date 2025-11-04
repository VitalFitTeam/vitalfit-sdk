export type ClientProfile = {
  user_id: string;
  qr_code: string;
  scoring: number;
  status: string;
  block_justification: string;
  category: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Role = {
  role_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  identity_document: string;
  birth_date: string;
  gender: string;
  profile_picture_url: string;
  is_validated: boolean;
  ClientProfile: ClientProfile;
  role_id: string;
  role: Role;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type UserApiResponse = {
  user: User;
};

export type UserPaginationOptions = {
  limit?: number;
  page?: number;
  sort?: 'asc' | 'desc';
  search?: string;
  role?: string;
};
