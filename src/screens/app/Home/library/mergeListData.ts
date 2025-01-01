import { InfiniteData } from "@tanstack/query-core";
import { ChatRoom, ChatRoomPaginatedResult } from "@domain";

export function mergeListData(
  data: InfiniteData<ChatRoomPaginatedResult | null>,
) {
  const newList = data.pages.reduce<ChatRoom[]>((acc, curr) => {
    if (curr && curr.data) {
      return [...acc, ...curr.data];
    }
    return acc;
  }, []);

  return newList;
}
