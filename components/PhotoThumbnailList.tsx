import * as React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { palette } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { Text } from "./Text";

interface PhotoThumbnailListProps {
  thumbnails: {
    id: string;
    url: string;
  }[];
  hasMorePhotos?: boolean;
  totalPhotoCount?: number;
  emptyLabel?: string;
  style?: ViewStyle;
}

export function PhotoThumbnailList(props: PhotoThumbnailListProps) {
  if (props.thumbnails.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyLabel}>
          {props.emptyLabel || componentsi18n("PhotoThumbnailList.emptyTitle")}
        </Text>
      </View>
    );

  return (
    <View style={[styles.container, props.style]}>
      {props.thumbnails.map((photo, index) => (
        <View key={photo.id} style={styles.photoContainer}>
          <Image source={{ uri: photo.url }} style={styles.photo} />
          {index === props.thumbnails.length - 1 &&
            props.hasMorePhotos &&
            props.totalPhotoCount && (
              <View style={styles.photoCountContainer}>
                <Text style={styles.photoCountText}>
                  +{props.totalPhotoCount - props.thumbnails.length}
                </Text>
              </View>
            )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
