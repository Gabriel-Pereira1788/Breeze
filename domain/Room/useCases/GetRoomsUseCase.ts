import { roomService } from "../roomService";

export function GetRoomsUseCaseFactory() {
  return {
    execute: async () => {
      return await roomService.getRooms();
    },
  };
}

export type GetRoomsUseCase = ReturnType<typeof GetRoomsUseCaseFactory>;
