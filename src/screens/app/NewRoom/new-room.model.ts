import { useNewRoomViewModel } from "./new-room.viewModel";
import { z } from "zod";

export type NewRoomScreenProps = {
  viewModel: NewRoomViewModel;
};

export type NewRoomViewModel = ReturnType<typeof useNewRoomViewModel>;

export const roomSchema = z.object({
  name: z.string({ required_error: "Empty Field" }).min(5, "Name to short."),
  description: z
    .string({ required_error: "Empty Field" })
    .min(5, "Name to short."),
});

export type RoomSchema = z.infer<typeof roomSchema>;
