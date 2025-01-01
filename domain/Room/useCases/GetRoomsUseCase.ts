import { roomService } from "../roomService";

export function GetRoomsUseCaseFactory() {
  return {
    execute: async (page: number) => {
      return await roomService.getRooms({ page });
    },
  };
}

export type GetRoomsUseCase = ReturnType<typeof GetRoomsUseCaseFactory>;
