import { useForm } from "react-hook-form";
import { roomSchema, RoomSchema } from "./new-room.model";
import { zodResolver } from "@hookform/resolvers/zod";

export function useNewRoomViewModel() {
  const { control, handleSubmit, formState } = useForm<RoomSchema>({
    defaultValues: {
      description: "",
      name: "",
    },
    mode: "onChange",
    resolver: zodResolver(roomSchema),
  });

  return {
    control,
  };
}
