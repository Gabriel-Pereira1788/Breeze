import { Profile, ProfileApi } from "../Profile/profileTypes";

export interface MessageRequest {
  chatRoomId: number;
  content: string;
  userId: string;
}

export interface Message {
  chatRoomId: number;
  content: string;
  createdAt: string;
  id: number;
  userId: string;
  user: Profile;
}

export interface MessageApi {
  chat_room_id: number;
  content: string;
  created_at: string;
  id: number;
  user_id: string;
  profiles: ProfileApi;
}
