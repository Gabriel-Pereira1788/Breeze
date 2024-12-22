export interface User {
  id: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
  username?: string;
}

export interface UserApi {
  id: string;
  email?: string;
  created_at?: string;
  role?: string;
  updated_at?: string;
  avatar_url?: string;
  username?: string;
}

export interface SessionApi {
  access_token: string;
  refresh_token: string;
  user: UserApi;
  email?: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type SignUpRequest = {
  email: string;
  password: string;
  phone: string;
  username: string;
};
