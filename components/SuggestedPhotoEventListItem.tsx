import * as React from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { PhotoEventWithMetadata } from "../types/models";
import { getBestSizeThumbnailForPhoto } from "../utils/photo";
import { Text } from "./Text";

type SuggestedPhotoEventListItemProps = {
  event: PhotoEventWithMetadata;
  onPress: (event: PhotoEventWithMetadata) => void;
};

export function SuggestedPhotoEventListItem(
  props: SuggestedPhotoEventListItemProps
) {
  const { event, onPress } = props;
  const handlePress = React.useCallback(() => onPress(event), [event, onPress]);
  const { hasStarted, hasEnded, timestamp } = React.useMemo(() => {
    const now = Date.now();
    const didStart = now > event.startsAt.valueOf();
    const didEnd = now > event.endsAt.valueOf();

    let timestamp = "";

    if (didEnd) {
      const difference = now - event.endsAt.valueOf();

      if (difference < 86400000) {
        timestamp = componentsi18n(
          "SuggestedPhotoEventListItem.eventEndedHoursAgoText",
          {
            hours: `${Math.floor(difference / 3600000) || 1}`,
          }
        );
      } else {
        timestamp = componentsi18n(
          "SuggestedPhotoEventListItem.eventEndedDaysAgoText",
          {
            days: `${Math.floor(difference / 86400000) || 1}`,
          }
        );
      }
    } else if (didStart) {
      const difference = event.endsAt.valueOf() - now;

      if (difference < 86400000) {
        timestamp = componentsi18n(
          "SuggestedPhotoEventListItem.eventEndsInHoursText",
          {
            hours: `${Math.floor(difference / 3600000) || 1}`,
          }
        );
      } else {
        timestamp = componentsi18n(
          "SuggestedPhotoEventListItem.eventEndsInDaysText",
          {
            days: `${Math.floor(difference / 86400000) || 1}`,
          }
        );
      }
    }

    return {
      hasStarted: didStart,
      hasEnded: didEnd,
      timestamp,
    };
  }, [event]);
  const status = React.useMemo(() => {
    if (event.contributionPeriodIsActive) {
      return componentsi18n(
        "SuggestedPhotoEventListItem.contributionPeriodActiveLabel"
      );
    }
    if (event.reactionPeriodIsActive) {
      return componentsi18n(
        "SuggestedPhotoEventListItem.reactionPeriodActiveLabel"
      );
    }
    if (!hasStarted) {
      return componentsi18n("SuggestedPhotoEventListItem.hasNotStartedLabel");
    }
    return componentsi18n("SuggestedPhotoEventListItem.hasFinishedLabel");
  }, [hasStarted, event]);
  const { photoThumbnails, hasMorePhotos } = React.useMemo(() => {
    return {
      photoThumbnails: event.photos.map((photo) => {
        const bestSizeThumbnail = getBestSizeThumbnailForPhoto(
          photo,
          layout.window.width / event.photos.length
        );
        return {
          id: photo.id,
          url: bestSizeThumbnail?.url || photo.imageUrl,
        };
      }),
      hasMorePhotos: event.photoCount > event.photos.length,
    };
  }, [event]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.event.name}</Text>
          <View style={styles.dot} />
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
        <View
          style={[
            styles.statusTag,
            !hasStarted && styles.statusTagStartsInFuture,
            hasEnded && styles.statusTagEnded,
            event.reactionPeriodIsActive && styles.statusTagReaction,
            event.contributionPeriodIsActive && styles.statusTagContribution,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              !hasStarted && styles.statusTextStartsInFuture,
              hasEnded && styles.statusTextEnded,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
      {photoThumbnails.length > 0 ? (
        <View style={styles.photoList}>
          {photoThumbnails.map((photo, index) => (
            <View key={photo.id} style={styles.photoContainer}>
              <Image source={{ uri: photo.url }} style={styles.photo} />
              {index === photoThumbnails.length - 1 && hasMorePhotos && (
                <View style={styles.photoCountContainer}>
                  <Text style={styles.photoCountText}>
                    +{event.photoCount - photoThumbnails.length}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyLabel}>
            {componentsi18n("SuggestedPhotoEventListItem.emptyLabel")}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: layout.window.width,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: theme.spacing[5],
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: typography.primaryBold,
    color: palette.black,
    fontSize: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: palette.grey300,
    marginHorizontal: 8,
  },
  timestamp: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: palette.grey300,
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  statusTagStartsInFuture: {
    backgroundColor: palette.teal100,
  },
  statusTagEnded: {
    backgroundColor: palette.grey200,
  },
  statusTagReaction: {
    backgroundColor: palette.purple100,
  },
  statusTagContribution: {
    backgroundColor: theme.palette.primary,
  },
  statusText: {
    fontFamily: typography.primaryBold,
    color: palette.white,
    fontSize: 12,
  },
  statusTextStartsInFuture: {
    color: palette.white,
  },
  statusTextEnded: {
    color: palette.black,
  },
  photoList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  photoContainer: {
    flexGrow: 1,
    aspectRatio: 1,
    marginHorizontal: 2,
    maxHeight: 80,
  },
  photo: {
    flexGrow: 1,
    borderRadius: 4,
  },
  photoCountContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  photoCountText: {
    fontFamily: typography.primaryBold,
    color: palette.white,
    fontSize: 28,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: palette.grey50,
    borderRadius: 4,
    padding: 10,
    minHeight: 80,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabel: {
    fontFamily: typography.primary,
    color: palette.blue300,
    textAlign: "center",
    fontSize: 16,
  },
});
