import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n, getLocalizedCapturePromptMessage } from "../lib/i18n";
import {
  Photo,
  PhotoEventWithGroup,
  PhotoEventWithMetadata,
} from "../types/models";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { PhotoListItem } from "./PhotoListItem";
import { Text } from "./Text";
import { UserGroupHeader } from "./UserGroupHeader";

type PhotoListProps = {
  data: Photo[];
  userId?: string;
  event: PhotoEventWithMetadata | PhotoEventWithGroup;
  isRefreshing: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  onItemPress: (photo: Photo) => void;
  onJoinEvent: () => void;
  onStartSliderReaction: () => void;
  onFetchMore: () => void;
};

export function PhotoList(props: PhotoListProps) {
  const { data } = props;

  const { trailingPhotosStartingIndex, trailingPhotoWidth } =
    React.useMemo(() => {
      const trailingItemsCount = data.length % layout.photoColumnCount;
      return {
        trailingPhotosStartingIndex:
          data.length === 1 ? 0 : data.length - trailingItemsCount || -1,
        trailingPhotoWidth:
          layout.photoWidth * (layout.photoColumnCount / trailingItemsCount),
      };
    }, [data]);

  if (props.isLoading) return <LoadingState />;

  return (
    <FlatList
      data={data}
      numColumns={layout.photoColumnCount}
      ListHeaderComponent={
        <>
          <UserGroupHeader event={props.event} />
          {props.event.isActive && (
            <View style={styles.joinEventCtaContainer}>
              <Text style={styles.joinEventCtaText}>
                {getLocalizedCapturePromptMessage()}
              </Text>
              {props.event.contributionPeriodIsActive && (
                <Button
                  text={componentsi18n("PhotoList.startTaskButtonText")}
                  icon={"camera"}
                  style={styles.addPhotosCtaButton}
                  onPress={props.onJoinEvent}
                />
              )}
              {props.event.reactionPeriodIsActive && (
                <Button
                  text={componentsi18n(
                    "PhotoList.startReactionRoundButtonText"
                  )}
                  icon={"slider"}
                  style={styles.startSliderReactionButton}
                  onPress={props.onStartSliderReaction}
                />
              )}
            </View>
          )}
        </>
      }
      ListEmptyComponent={
        <EmptyState
          title={componentsi18n("PhotoList.emptyTitle")}
          style={styles.emptyContainer}
          message={
            props.event.contributionPeriodIsActive
              ? componentsi18n("PhotoList.contributionPeriodSubtitle")
              : undefined
          }
        />
      }
      refreshing={props.isRefreshing}
      renderItem={(params) => (
        <PhotoListItem
          key={params.item.id}
          trailingStartingIndex={trailingPhotosStartingIndex}
          trailingPhotoWidth={trailingPhotoWidth}
          index={params.index}
          isOwnPhoto={params.item.createdBy === props.userId}
          photo={params.item}
          onPress={props.onItemPress}
        />
      )}
      contentContainerStyle={styles.contentContainer}
      onRefresh={props.onRefresh}
      onEndReached={props.onFetchMore}
    />
  );
}

const styles = StyleSheet.create({
  listHeaderContainer: {
    width: layout.window.width,
    backgroundColor: palette.grey50,
    marginBottom: 4,
  },
  listHeaderGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing[5],
  },
  listHeaderGroupLabel: {
    fontFamily: typography.primary,
    color: palette.blue300,
    fontSize: 18,
    marginLeft: theme.spacing[3],
    top: 3,
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingBottom: 4,
    flexGrow: 1,
  },
  joinEventCtaContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: theme.palette.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  joinEventCtaText: {
    fontFamily: typography.primary,
    color: palette.black,
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 19,
  },
  addPhotosCtaButton: {
    alignSelf: "stretch",
  },
  startSliderReactionButton: {
    marginTop: 16,
    backgroundColor: palette.black,
    alignSelf: "stretch",
  },
  emptyContainer: {
    margin: 4,
  },
});
