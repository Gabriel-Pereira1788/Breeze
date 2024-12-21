import { ChatRoom, GetRoomsUseCase } from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

type Props = {
  getRoomsUseCase: GetRoomsUseCase;
};

export function useHomeViewModel({ getRoomsUseCase }: Props) {
  const { data: rooms, isLoading } = useQuery({
    queryKey: [QueryKeys.ChatRooms],
    queryFn: getRoomsUseCase.execute,
  });

  function redirectToChatRoom({
    id,
    name,
    imageUrl,
  }: Omit<ChatRoom, "description" | "ownerId">) {
    router.push(`/(app)/chats/${id}?title=${name}&imageUrl=${imageUrl}`);
  }
  return {
    rooms,
    isLoading,
    redirectToChatRoom,
  };
}

export type HomeViewModel = ReturnType<typeof useHomeViewModel>;
