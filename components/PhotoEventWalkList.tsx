import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { componentsi18n } from "../lib/i18n";
import { PhotoEventWalkWithPhotos } from "../types/models";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { PhotoEventWalkListItem } from "./PhotoEventWalkListItem";

type PhotoEventWalkListProps = {
  data: PhotoEventWalkWithPhotos[];
  isRefreshing: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onItemPress: (walk: PhotoEventWalkWithPhotos) => void;
};

export function PhotoEventWalkList(props: PhotoEventWalkListProps) {
  const { data } = props;

  if (props.isLoading) return <LoadingState />;

  return (
    <FlatList
      data={data}
      ListEmptyComponent={
        <EmptyState
          title={componentsi18n("PhotoEventWalkList.emptyTitle")}
          style={styles.emptyContainer}
        />
      }
      refreshing={props.isRefreshing}
      renderItem={(params) => (
        <PhotoEventWalkListItem
          key={params.item.id}
          walk={params.item}
          onPress={props.onItemPress}
        />
      )}
      contentContainerStyle={styles.contentContainer}
      onRefresh={props.onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 4,
    flexGrow: 1,
  },
  emptyContainer: {
    margin: 4,
  },
});
