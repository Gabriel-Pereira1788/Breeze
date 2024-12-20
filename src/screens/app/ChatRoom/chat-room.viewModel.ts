import { useSession } from "@/providers";
import {
  GetMessagesUseCase,
  Message,
  messagesService,
  SendMessageUseCase,
} from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type Props = {
  sendMessageUseCase: SendMessageUseCase;
  getMessagesUseCase: GetMessagesUseCase;
};

const CHAT_ROOM_ID = 1;

export function useChatRoomViewModel({
  sendMessageUseCase,
  getMessagesUseCase,
}: Props) {
  const { session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getMessagesUseCase.execute(CHAT_ROOM_ID),
    queryKey: [QueryKeys.Messages],
  });

  console.log("ERROR", error);
  const [messages, setMessages] = useState<Message[]>([]);

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
          chatRoomId: CHAT_ROOM_ID,
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
    userId: session?.user.id ?? "",
  };
}

export type ChatRoomViewModel = ReturnType<typeof useChatRoomViewModel>;
