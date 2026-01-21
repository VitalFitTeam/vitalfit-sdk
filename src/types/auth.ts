export enum UserGender {
  male = 'male',
  female = 'female',
  preferNotToSay = 'prefer-not-to-say',
}

export type LoginRequest = {
  email: string;
  password: string;
  context?: string;
  device_token?: string;
};

export type LoginResponse = {
  refresh_token: string;
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

export type Oauth = {
  session_token: string;
};

export type UserSession = {
  id: string;
  user_id: string;
  refresh_token: string;
  user_agent: string;
  client_ip: string;
  is_blocked: boolean;
  expires_at: string;
  created_at: string;
};

export type RenewTokenRequest = {
  refresh_token: string;
};
