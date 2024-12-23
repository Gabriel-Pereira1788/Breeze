import { Profile } from "../Profile/profileTypes";

import { profileAdapter } from "../Profile/profileAdapter";
import { Message, MessageApi, MessageRequest } from "./messagesTypes";
import { User } from "../Auth";

function toMessage(messageApi: MessageApi): Message {
  return {
    chatRoomId: messageApi.chat_room_id,
    content: messageApi.content,
    createdAt: messageApi.created_at,
    id: messageApi.id,
    userId: messageApi.user_id,
    user: profileAdapter.toProfileData(messageApi.profiles),
  };
}

function toMessageList(messageListApi: MessageApi[]) {
  return messageListApi.map((data) => toMessage(data));
}

function buildMessage({
  chatRoomId,
  content,
  userId,
  user,
}: MessageRequest & { user: User }): Message {
  return {
    chatRoomId,
    content,
    userId,
    id: new Date().getTime(),
    createdAt: new Date().toString(),
    user,
  };
}

export const messagesAdapter = {
  toMessage,
  toMessageList,
  buildMessage,
};
