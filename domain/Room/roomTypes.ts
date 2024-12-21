export interface ChatRoomApi {
  creadted_at: string;
  id: number;
  image_url: string;
  name: string;
  owner_id: string;
  description: string;
}

export interface ChatRoom {
  id: number;
  imageUrl: string;
  name: string;
  ownerId: string;
  description: string;
}

export interface NewRoomRequest {
  name: string;
  description: string;
  imageUrl: string;
}
