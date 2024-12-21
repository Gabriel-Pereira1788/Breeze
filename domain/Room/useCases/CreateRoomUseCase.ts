import { roomService } from "../roomService";
import { NewRoomRequest } from "../roomTypes";

export function CreateRoomUseCaseFactory() {
  return {
    execute: async (request: NewRoomRequest) => {
      return roomService.createRoom(request);
    },
  };
}

export type CreateRoomUseCase = ReturnType<typeof CreateRoomUseCaseFactory>;
