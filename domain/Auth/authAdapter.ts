import { Session, SessionApi, User, UserApi } from "./authTypes";

function toUser(userApi: UserApi): User {
  return {
    id: userApi.id,
    email: userApi.email,
    role: userApi.role,
  };
}

function toValidSession(session: SessionApi): Session {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    user: toUser(session.user),
  };
}

export const authAdapter = {
  toUser,
  toValidSession,
};
