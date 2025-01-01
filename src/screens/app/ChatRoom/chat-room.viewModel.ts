import { useSession } from "@/providers";
import {
  GetMessagesUseCase,
  Message,
  messagesService,
  SendMessageUseCase,
} from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildAvatars } from "./library";
import { FlatList } from "react-native";

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

  const flatlistRef = useRef<FlatList>(null);

  const { data, isLoading, error } = useQuery({
    queryFn: () => getMessagesUseCase.execute(Number(chatRoomId)),
    queryKey: [QueryKeys.Messages, chatRoomId],
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const userImageUrls = useMemo(
    () => buildAvatars(messages, session?.user.id),
    [messages],
  );

  useEffect(() => {
    let chatEvent: { unsubscribe: VoidFunction } | undefined;
    if (data) {
      setMessages(data);

      scrollToEnd();

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
        scrollToEnd();
      }
    } catch (error) {
      console.log("ERR", error);
    }
  }

  function scrollToEnd() {
    setTimeout(() => {
      flatlistRef.current?.scrollToEnd({
        animated: true,
      });
    }, 200);
  }

  return {
    send,
    isLoading,
    messages,
    userImageUrls,
    flatlistRef,
    error,
    userId: session?.user.id ?? "",
    title: title as string,
    imageUrl: imageUrl as string,
  };
}

export type ChatRoomViewModel = ReturnType<typeof useChatRoomViewModel>;
