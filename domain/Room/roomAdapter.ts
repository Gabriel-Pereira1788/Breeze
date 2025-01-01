import { ChatRoom, ChatRoomApi, ChatRoomPaginatedResult } from "./roomTypes";

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

function toChatRoomPaginatedResult(
  chatRoomsListApi: ChatRoomApi[],
  page: number,
): ChatRoomPaginatedResult {
  return {
    data: chatRoomsListApi.map((item) => toChatRoom(item)),
    nextPage: page + 1,
    hasNextPage: chatRoomsListApi.length > 0,
  };
}

export const roomAdapter = {
  toChatRoom,
  toChatRoomPaginatedResult,
  toChatRoomList,
};
