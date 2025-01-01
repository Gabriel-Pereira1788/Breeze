import { supabase } from "@infra";
import { roomAdapter } from "./roomAdapter";
import { NewRoomRequest, QueryParams } from "./roomTypes";
import { authService } from "domain/Auth";

async function getRooms({ page = 1, perPage = 10 }: QueryParams) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data: rooms, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .range(from, to)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return roomAdapter.toChatRoomPaginatedResult(rooms, page);
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

async function searchByText(
  text: string,
  { page = 1, perPage = 10 }: QueryParams,
) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data: rooms, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .ilike("name", `%${text}%`)
    .range(from, to)
    .order("created_at", {
      ascending: true,
    });

  console.log("DATA-ROOMS", rooms);
  if (error) {
    throw new Error(error.message);
  }

  return roomAdapter.toChatRoomPaginatedResult(rooms, page);
}

export const roomService = {
  getRooms,
  createRoom,
  searchByText,
};
