export enum UserGender {
  male = 'male',
  female = 'female',
}

export type LoginRequest = {
  email: string;
  password: string;
  context?: string;
};

export type LoginResponse = {
  token: string;
};

export type SignUpRequest = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  identity_document: string;
  phone?: string | null;
  birth_date: string;
  gender?: UserGender | null;
  profile_picture_url?: string | null;
  role_name?: string | null;
};
