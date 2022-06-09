import * as React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { PhotoEventWalkWithPhotos } from "../types/models";
import { formatDate } from "../utils/date";
import { getBestSizeThumbnailForPhoto } from "../utils/photo";
import { formatDistance, formatDuration } from "../utils/photo-event-walk";
import { Icon } from "./Icon";
import { PhotoThumbnailList } from "./PhotoThumbnailList";
import { Text } from "./Text";

type PhotoEventWalkListItemProps = {
  walk: PhotoEventWalkWithPhotos;
  onPress: (walk: PhotoEventWalkWithPhotos) => void;
};

export function PhotoEventWalkListItem(props: PhotoEventWalkListItemProps) {
  const { walk, onPress } = props;
  const thumbnails = React.useMemo(() => {
    return walk.photos.map((photo) => {
      const bestSizeThumbnail = getBestSizeThumbnailForPhoto(
        photo,
        layout.window.width / walk.photos.length
      );
      return {
        id: photo.id,
        url: bestSizeThumbnail?.url || photo.imageUrl,
      };
    });
  }, [walk]);

  const handlePress = React.useCallback(() => {
    onPress(walk);
  }, [onPress, walk]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.titleContainer}>
        <Icon icon={"walking"} width={24} height={24} color={palette.blue300} />
        <Text style={styles.title}>{props.walk.name}</Text>
      </View>
      <View style={styles.metadataRow}>
        <Text style={styles.metadataTitle}>
          {componentsi18n("PhotoEventWalkListItem.dateTitle")}
        </Text>
        <Text style={styles.timespan}>{`${formatDate(
          walk.startedAt
        )} - ${formatDate(walk.endedAt)}`}</Text>
      </View>
      <View style={styles.metadataRow}>
        <Text style={styles.metadataTitle}>
          {componentsi18n("PhotoEventWalkListItem.durationTitle")}
        </Text>
        <Text style={styles.metadataValue}>
          {formatDuration(walk.duration)}
        </Text>
      </View>
      <View style={styles.metadataRow}>
        <Text style={styles.metadataTitle}>
          {componentsi18n("PhotoEventWalkListItem.distanceTitle")}
        </Text>
        <Text style={styles.metadataValue}>
          {formatDistance(walk.distance)}
        </Text>
      </View>
      <PhotoThumbnailList
        thumbnails={thumbnails}
        emptyLabel={componentsi18n("PhotoEventWalkListItem.emptyTitle")}
        style={styles.photoThumbnailList}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: palette.grey50,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.primaryBold,
    color: palette.grey600,
    fontSize: 20,
    marginLeft: 12,
    marginTop: 2,
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  metadataTitle: {
    fontFamily: typography.primaryBold,
    color: palette.grey600,
    fontSize: 16,
    marginRight: 8,
  },
  metadataValue: {
    fontFamily: typography.primaryBold,
    color: theme.palette.primary,
    fontSize: 16,
  },
  timespan: {
    fontFamily: typography.primary,
    color: palette.grey500,
    fontSize: 14,
  },
  photoThumbnailList: {
    marginTop: 7,
  },
});
