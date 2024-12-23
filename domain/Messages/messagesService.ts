import { supabase } from "@infra";
import { Message, MessageApi, MessageRequest } from "./messagesTypes";
import { messagesAdapter } from "./messagesAdapter";
import { authService } from "../Auth";

async function sendMessage({
  chatRoomId,
  content,
  userId,
}: MessageRequest): Promise<Message> {
  const session = authService.getInMemorySession();

  if (!session) throw new Error("Session invalid");
  const { error } = await supabase
    .from("messages")
    .insert([{ chat_room_id: chatRoomId, user_id: userId, content }]);
  if (error) throw new Error(error.message);

  return messagesAdapter.buildMessage({
    chatRoomId,
    content,
    userId,
    user: session.user!,
  });
}

async function getMessages(chatRoomId: number): Promise<Message[]> {
  const { data: messages, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      profiles (
        id,
        username,
        avatar_url
      )
    `
    )
    .eq("chat_room_id", chatRoomId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return messagesAdapter.toMessageList(messages);
}

function onReceiveMessage(event: (payload: Message) => void) {
  return supabase
    .channel("message_channel")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        const response = payload.new as MessageApi;
        event(messagesAdapter.toMessage(response));
      }
    )
    .subscribe();
}

export const messagesService = {
  sendMessage,
  getMessages,
  onReceiveMessage,
};
