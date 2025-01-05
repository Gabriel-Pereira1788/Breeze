import { roomService } from "../roomService";

export function DeleteRoomUseCaseFactory() {
  return {
    execute: async (roomId: string) => {
      return roomService.deleteRoom(roomId);
    },
  };
}

export type DeleteRoomUseCase = ReturnType<typeof DeleteRoomUseCaseFactory>;
