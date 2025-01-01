import { Session } from "../../../../../domain/Auth/authTypes";

export const mockSession: Session = {
  accessToken: "123",
  user: {
    email: "johndoe@email.com",
    avatarUrl: "www.image.com",
    id: "1",
    username: "johndoe",
  },
  refreshToken: "321",
};
