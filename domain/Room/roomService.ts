import { supabase } from "@infra";
import { roomAdapter } from "./roomAdapter";

async function getRooms() {
  const { data: rooms, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  console.log("ROOMS", rooms);
  if (error) {
    throw new Error(error.message);
  }

  return rooms ? roomAdapter.toChatRoomList(rooms) : [];
}

export const roomService = {
  getRooms,
};
