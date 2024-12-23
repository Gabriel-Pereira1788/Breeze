import { Profile, ProfileApi } from "./profileTypes";

function toProfileData(profileApi: ProfileApi): Profile {
  return {
    id: profileApi.id,
    username: profileApi.username,
    avatarUrl: profileApi.avatar_url,
    email: profileApi.email,
  };
}

export const profileAdapter = {
  toProfileData,
};
