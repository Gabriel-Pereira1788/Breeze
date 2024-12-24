import { Message } from "@domain";

export function buildAvatars(messages: Message[], userId?: string): string[] {
  const ids = new Set(messages.map((message) => message.userId));

  const usersImagesUrls: string[] = [];

  for (let id of Array.from(ids)) {
    const message = messages.find((message) => message.userId === id);
    if (message && message.userId !== userId && message.user.avatarUrl) {
      usersImagesUrls.push(message.user.avatarUrl);
    }
  }

  return usersImagesUrls;
}
