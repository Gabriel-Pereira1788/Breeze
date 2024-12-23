export interface Profile {
  avatarUrl?: string;
  id: string;
  username?: string;
  email?: string;
}

export interface ProfileApi {
  avatar_url?: string;
  full_name?: string;
  id: string;
  updated_at?: string;
  email: string;
  username: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  avatarUrl: string;
}
