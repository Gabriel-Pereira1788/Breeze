import { ChatRoom, ChatRoomApi } from "./roomTypes";

function toChatRoom(chatRoomApi: ChatRoomApi): ChatRoom {
  return {
    id: chatRoomApi.id,
    imageUrl: chatRoomApi.image_url,
    name: chatRoomApi.name,
    ownerId: chatRoomApi.owner_id,
    description: chatRoomApi.description,
  };
}

function toChatRoomList(chatRoomListApi: ChatRoomApi[]): ChatRoom[] {
  return chatRoomListApi.map((item) => toChatRoom(item));
}

export const roomAdapter = {
  toChatRoom,
  toChatRoomList,
};
