import { roomService } from "../roomService";

export function GetRoomByTextUseCaseFactory() {
  return {
    execute: async (text: string) => {
      return await roomService.searchByText(text);
    },
  };
}

export type GetRoomByTextUseCase = ReturnType<
  typeof GetRoomByTextUseCaseFactory
>;
