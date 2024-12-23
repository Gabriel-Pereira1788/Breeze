import { useSession } from "@/providers";
import {
  ChatRoom,
  GetMessagesUseCase,
  Message,
  messagesService,
  SendMessageUseCase,
} from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useState } from "react";
import { buildAvatars } from "./library";

type Props = {
  sendMessageUseCase: SendMessageUseCase;
  getMessagesUseCase: GetMessagesUseCase;
};

export function useChatRoomViewModel({
  sendMessageUseCase,
  getMessagesUseCase,
}: Props) {
  const { session } = useSession();
  const { chatRoomId, title, imageUrl } = useLocalSearchParams();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getMessagesUseCase.execute(Number(chatRoomId)),
    queryKey: [QueryKeys.Messages, chatRoomId],
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const userImageUrls = useMemo(
    () => buildAvatars(messages, session?.user.id),
    [messages]
  );

  useEffect(() => {
    let chatEvent: { unsubscribe: () => void } | undefined;
    if (data) {
      setMessages(data);
      chatEvent = messagesService.onReceiveMessage((payload) => {
        if (payload.userId != session?.user.id) {
          setMessages((_messages) => [..._messages, payload]);
        }
      });
    }
    return () => {
      chatEvent?.unsubscribe();
    };
  }, [data]);

  async function send(messageText: string) {
    try {
      if (session && session.user && messageText.trim() !== "") {
        const response = await sendMessageUseCase.execute({
          chatRoomId: Number(chatRoomId),
          content: messageText,
          userId: session.user.id,
        });

        setMessages((_messages) => [..._messages, response]);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  }

  return {
    send,
    isLoading,
    messages,
    userImageUrls,
    error,
    userId: session?.user.id ?? "",
    title: title as string,
    imageUrl: imageUrl as string,
  };
}

export type ChatRoomViewModel = ReturnType<typeof useChatRoomViewModel>;
