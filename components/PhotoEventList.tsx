import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { PhotoEvent } from "../types/models";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { PhotoEventCreationForm } from "./PhotoEventCreationForm";
import { PhotoEventListItem } from "./PhotoEventListItem";

type PhotoEventListProps = {
  data: PhotoEvent[];
  isLoading: boolean;
  isCreationFormOpen: boolean;
  isRefreshing: boolean;
  onItemPress: (event: PhotoEvent) => void;
  onItemLongPress: (event: PhotoEvent) => void;
  onRefresh: () => void;
  onCreatePhotoEventSubmit: (params: {
    name: string;
    contributionPeriodStartsAt: Date;
    contributionPeriodEndsAt: Date;
    reactionPeriodStartsAt: Date;
    reactionPeriodEndsAt: Date;
  }) => Promise<void>;
};

export function PhotoEventList(props: PhotoEventListProps) {
  if (props.isLoading) return <LoadingState />;
  return (
    <FlatList
      data={props.data}
      contentContainerStyle={styles.listContentContainer}
      ListHeaderComponent={
        props.isCreationFormOpen ? (
          <PhotoEventCreationForm
            isLoading={props.isLoading}
            onSubmit={props.onCreatePhotoEventSubmit}
          />
        ) : null
      }
      ListEmptyComponent={
        <EmptyState title={"There's no photo tasks in this group"} />
      }
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      renderItem={({ item }) => (
        <PhotoEventListItem
          key={item.id}
          event={item}
          onPress={props.onItemPress}
          onLongPress={props.onItemLongPress}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
});
