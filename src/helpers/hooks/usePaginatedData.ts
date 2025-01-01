import { useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedResult, QueryKeys } from "@infra";

type PaginatedDataProps<TData> = {
  queryKey: [QueryKeys, string];
  getDataFn: (page: number) => Promise<PaginatedResult<TData>>;
};
export function usePaginatedData<TData>({
  queryKey,
  getDataFn,
}: PaginatedDataProps<TData>) {
  const { data, isLoading, fetchNextPage, refetch, isRefetching } =
    useInfiniteQuery({
      queryKey: queryKey,
      getNextPageParam: (lastPage: PaginatedResult<any> | null) =>
        lastPage?.hasNextPage ? lastPage.nextPage : null,
      queryFn: ({ pageParam = 1 }) => getDataFn(pageParam),
    });

  const list = useMemo(() => {
    if (!data) return [];
    return data.pages.reduce<TData[]>((acc, curr) => {
      if (curr && curr.data) {
        return [...acc, ...curr.data];
      }
      return acc;
    }, []);
  }, [data]);

  return {
    list,
    isLoading,
    fetchNextPage,
    refresh: refetch,
    refreshing: isRefetching,
  };
}
