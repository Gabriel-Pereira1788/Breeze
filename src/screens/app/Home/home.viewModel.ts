import { ChatRoom, GetRoomByTextUseCase, GetRoomsUseCase } from "@domain";
import { QueryKeys } from "@infra";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { usePaginatedData } from "@/helpers";

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
    list: rooms,
    isLoading,
    refresh,
    refreshing,
    fetchNextPage,
  } = usePaginatedData({
    queryKey: [QueryKeys.ChatRooms, searchText],
    getDataFn: (page) => getRooms(page),
  });

  async function getRooms(page: number) {
    if (searchText.trim().length > 0) {
      return await getRoomByTextUseCase.execute(searchText, page);
    } else {
      return await getRoomsUseCase.execute(page);
    }
  }

  function redirectToChatRoom({
    id,
    name,
    imageUrl,
    ownerId,
  }: Omit<ChatRoom, "description">) {
    router.push(
      `/(app)/chats/${id}?title=${name}&imageUrl=${imageUrl}&ownerId=${ownerId}`,
    );
  }

  const onSearchText = useCallback(async (text: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchText(text);
    }, 500);
  }, []);

  return {
    rooms,
    isLoading,
    redirectToChatRoom,
    fetchNextPage,
    onSearchText,
    refresh,
    refreshing,
  };
}

export type HomeViewModel = ReturnType<typeof useHomeViewModel>;
