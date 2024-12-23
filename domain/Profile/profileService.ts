import { supabase } from "@infra";
import { authService } from "domain/Auth";
import { profileAdapter } from "./profileAdapter";
import { ProfileRequest } from "./profileTypes";

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

async function editProfile({ avatarUrl, email, username }: ProfileRequest) {
  const session = authService.getInMemorySession();
  if (!session) throw new Error("Session is invalid");
  const { error } = await supabase.from("profiles").upsert({
    id: session.user.id,
    username: username,
    email: email,
    avatar_url: avatarUrl,
  });

  if (error) throw new Error(error.message);

  console.log("ERROR", error);
  return null;
}

export const profileService = {
  getProfile,
  editProfile,
};
