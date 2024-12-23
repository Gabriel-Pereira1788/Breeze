import { Message } from "@domain";

export function buildAvatars(messages: Message[], userId?: string): string[] {
  return messages
    .filter((message) => {
      return message.userId != userId && !!message.user.avatarUrl;
    })
    .map((message) => message.user.avatarUrl!);
}
