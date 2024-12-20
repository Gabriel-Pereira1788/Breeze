import { Message, MessageApi, MessageRequest } from "./messagesTypes";

function toMessage(messageApi: MessageApi): Message {
  return {
    chatRoomId: messageApi.chat_room_id,
    content: messageApi.content,
    createdAt: messageApi.created_at,
    id: messageApi.id,
    userId: messageApi.user_id,
  };
}

function toMessageList(messageListApi: MessageApi[]) {
  return messageListApi.map((data) => toMessage(data));
}

function buildMessage({
  chatRoomId,
  content,
  userId,
}: MessageRequest): Message {
  return {
    chatRoomId,
    content,
    userId,
    id: new Date().getTime(),
    createdAt: new Date().toString(),
  };
}

export const messagesAdapter = {
  toMessage,
  toMessageList,
  buildMessage,
};
