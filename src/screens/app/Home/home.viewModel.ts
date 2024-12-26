import { ChatRoom, GetRoomByTextUseCase, GetRoomsUseCase } from "@domain";
import { QueryKeys } from "@infra";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef, useState } from "react";

type Props = {
  getRoomsUseCase: GetRoomsUseCase;
  getRoomByTextUseCase: GetRoomByTextUseCase;
};

export function useHomeViewModel({
  getRoomsUseCase,
  getRoomByTextUseCase,
}: Props) {
  const debounceTimeout = useRef<NodeJS.Timeout>();
  const [searchText, setSearchText] = useState("");

  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryKeys.ChatRooms, searchText],
    queryFn: getRooms,
  });

  console.log("ERROR", error);

  async function getRooms() {
    if (searchText.trim().length > 0) {
      return await getRoomByTextUseCase.execute(searchText);
    } else {
      return await getRoomsUseCase.execute();
    }
  }

  function redirectToChatRoom({
    id,
    name,
    imageUrl,
  }: Omit<ChatRoom, "description" | "ownerId">) {
    router.push(`/(app)/chats/${id}?title=${name}&imageUrl=${imageUrl}`);
  }

  async function onSearchText(text: string) {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchText(text);
    }, 500);
  }

  return {
    rooms,
    isLoading,
    redirectToChatRoom,
    onSearchText,
  };
}

export type HomeViewModel = ReturnType<typeof useHomeViewModel>;
