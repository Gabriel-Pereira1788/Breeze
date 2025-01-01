import { roomService } from "../roomService";

export function GetRoomByTextUseCaseFactory() {
  return {
    execute: async (text: string, page: number) => {
      return await roomService.searchByText(text, { page });
    },
  };
}

export type GetRoomByTextUseCase = ReturnType<
  typeof GetRoomByTextUseCaseFactory
>;
