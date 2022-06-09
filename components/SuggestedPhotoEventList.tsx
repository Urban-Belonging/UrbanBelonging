import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { PhotoEventWithMetadata } from "../types/models";
import { LoadingState } from "./LoadingState";
import { SuggestedPhotoEventListItem } from "./SuggestedPhotoEventListItem";
import { Text } from "./Text";

type SuggestedPhotoEventListProps = {
  data: PhotoEventWithMetadata[];
  isLoading: boolean;
  isRefreshing: boolean;
  onItemPress: (event: PhotoEventWithMetadata) => void;
  onRefresh: () => void;
};

export function SuggestedPhotoEventList(props: SuggestedPhotoEventListProps) {
  if (props.isLoading) return <LoadingState />;
  return (
    <FlatList
      data={props.data}
      contentContainerStyle={styles.listContentContainer}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {componentsi18n("SuggestedPhotoEventList.headerTitle")}
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.welcomeTitle}>
            {componentsi18n("SuggestedPhotoEventList.emptyTitle")}
          </Text>
          <Text style={styles.emptyTitle}>
            {componentsi18n("SuggestedPhotoEventList.emptySubtitle")}
          </Text>
          <Text style={styles.emptyText}>
            {componentsi18n("SuggestedPhotoEventList.emptyText")}
          </Text>
        </View>
      }
      onRefresh={props.onRefresh}
      refreshing={props.isRefreshing}
      renderItem={({ item }) => (
        <SuggestedPhotoEventListItem
          key={item.id}
          event={item}
          onPress={props.onItemPress}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerText: {
    fontFamily: typography.primaryBold,
    fontSize: 34,
    color: palette.black,
  },
  emptyContainer: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    textAlign: "center",
    fontFamily: typography.primaryBold,
    fontSize: 34,
    color: theme.palette.primary,
    marginBottom: 24,
  },
  emptyTitle: {
    textAlign: "center",
    fontFamily: typography.primaryBold,
    fontSize: 20,
    color: palette.black,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: typography.primary,
    fontSize: 16,
    color: palette.black,
  },
});
