import React from "react";
import {
  RefreshControl,
  FlatListProps,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Box } from "@/components";

type InfinityScrollListProps<Data> = {
  isLoading?: boolean;
  loadingNextPage?: boolean;
  // emptyLabelProps?: EmptyLabelProps;
  fetchNextPage: () => void;
} & Omit<
  FlatListProps<Data>,
  | "refreshControl"
  | "ListEmptyComponent"
  | "ListFooterComponent"
  | "onEndReached"
>;

export function InfinityScrollList<Data>({
  data,
  renderItem,
  isLoading,
  loadingNextPage,
  onRefresh,
  testID,
  fetchNextPage,
  refreshing,
  ...flatListProps
}: InfinityScrollListProps<Data>) {
  if (isLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator
          testID="infinity-scroll-loading-element"
          size={20}
          color={"#ddd"}
        />
      </Box>
    );
  }
  return (
    <FlatList
      testID={testID}
      data={data}
      renderItem={renderItem}
      // ListEmptyComponent={
      //   emptyLabelProps && (
      //     <Box alignContent="center" mt="sp40">
      //       <EmptyLabel {...emptyLabelProps} />
      //     </Box>
      //   )
      // }
      ItemSeparatorComponent={() => (
        <Box style={{ width: "100%", height: 10 }} />
      )}
      ListFooterComponent={
        loadingNextPage ? (
          <Box my="sp16">
            <ActivityIndicator size={15} />
          </Box>
        ) : undefined
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl
            testID="refresh-scroll-list-controll"
            onRefresh={onRefresh}
            refreshing={!!refreshing}
          />
        ) : undefined
      }
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
      onEndReached={() => fetchNextPage()}
      {...flatListProps}
    />
  );
}
