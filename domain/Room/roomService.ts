import { supabase } from "@infra";
import { roomAdapter } from "./roomAdapter";
import { NewRoomRequest } from "./roomTypes";
import { authService } from "domain/Auth";

async function getRooms() {
  const { data: rooms, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return rooms ? roomAdapter.toChatRoomList(rooms) : [];
}

async function createRoom({ name, description, imageUrl }: NewRoomRequest) {
  const session = authService.getInMemorySession();
  if (!session) throw new Error("Session is invalid");

  const { error } = await supabase.from("chat_rooms").insert([
    {
      name: name,
      description: description,
      image_url: imageUrl,
      owner_id: session.user.id,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return null;
}

export const roomService = {
  getRooms,
  createRoom,
};
