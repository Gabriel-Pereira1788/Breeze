import { messagesService } from "../messagesService";

export function GetMessagesUseCaseFactory() {
  return {
    execute: async (chatRoomId: number) => {
      return await messagesService.getMessages(chatRoomId);
    },
  };
}

export type GetMessagesUseCase = ReturnType<typeof GetMessagesUseCaseFactory>;
