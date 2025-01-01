export interface PaginatedResult<TData> {
  data: TData[];
  hasNextPage: boolean;
  nextPage: number;
}
