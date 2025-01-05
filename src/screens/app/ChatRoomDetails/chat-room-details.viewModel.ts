import { useLocalSearchParams } from "expo-router/build/hooks";
import { ChatRoomDetailsViewModelProps } from "@/screens/app/ChatRoomDetails/chat-room-details.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@infra";
import { router } from "expo-router";
import { useSession } from "@/providers";
import { useMemo } from "react";

export function useChatRoomDetailsViewModel({
  deleteRoomUseCase,
}: ChatRoomDetailsViewModelProps) {
  const { chatRoomId, title, imageUrl, ownerId } = useLocalSearchParams();
  const { session } = useSession();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    null,
    Error,
    { chatRoomId: string }
  >({
    mutationFn: (variables) => {
      console.log("variables", variables);
      return deleteRoomUseCase.execute(variables.chatRoomId);
    },
    onSuccess: async () => {
      console.log("Successfully delete");
      await queryClient.invalidateQueries([QueryKeys.ChatRooms]);
      router.dismissTo("(tabs)");
    },
    onError: (error) => {
      console.log("Error on delete chat room", error);
    },
  });

  const isOwner = useMemo(() => {
    return session?.user.id === ownerId;
  }, []);

  async function deleteChatRoom() {
    console.log("CHAT-ROOM", chatRoomId);
    mutate({
      chatRoomId: chatRoomId as string,
    });
  }

  return {
    title: title as string,
    imageUrl: imageUrl as string,
    isLoading,
    isOwner,
    deleteChatRoom,
  };
}

export type ChatRoomDetailsViewModel = ReturnType<
  typeof useChatRoomDetailsViewModel
>;
