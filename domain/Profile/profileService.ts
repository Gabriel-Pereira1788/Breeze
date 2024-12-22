import { supabase } from "@infra";
import { authService } from "domain/Auth";
import { profileAdapter } from "./profileAdapter";

async function getProfile() {
  const session = authService.getInMemorySession();

  if (!session) throw new Error("Session is invalid");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id);

  if (error) throw new Error(error.message);

  return data.length > 0 ? profileAdapter.toProfileData(data[0]) : null;
}

export const profileService = {
  getProfile,
};
