import { messagesService } from "../messagesService";
import { MessageRequest } from "../messagesTypes";

export function SendMessageUseCaseFactory() {
  return {
    execute: async (request: MessageRequest) => {
      return await messagesService.sendMessage(request);
    },
  };
}

export type SendMessageUseCase = ReturnType<typeof SendMessageUseCaseFactory>;
