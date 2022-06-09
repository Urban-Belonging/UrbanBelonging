import * as React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette } from "../constants/theme";
import { typography } from "../constants/typography";
import { componentsi18n } from "../lib/i18n";
import { Photo } from "../types/models";
import { getBestSizeThumbnailForPhoto } from "../utils/photo";
import { Icon } from "./Icon";
import { Text } from "./Text";

type PhotoListItemProps = {
  photo: Photo;
  index: number;
  trailingStartingIndex: number;
  trailingPhotoWidth: number;
  isOwnPhoto: boolean;
  onPress: (photo: Photo) => void;
};

export function PhotoListItem(props: PhotoListItemProps) {
  const { photo, index, trailingStartingIndex, trailingPhotoWidth, onPress } =
    props;
  const handlePress = React.useCallback(() => {
    onPress(photo);
  }, [photo, onPress]);
  const thumbnail = React.useMemo(() => {
    if (!photo.thumbnails || photo.thumbnails.length === 0) {
      return photo.imageUrl;
    }

    let photoWidth = layout.photoWidth;

    if (trailingStartingIndex > -1 && index >= trailingStartingIndex) {
      photoWidth = trailingPhotoWidth;
    }

    const closestSizeThumbnail = getBestSizeThumbnailForPhoto(
      photo,
      photoWidth
    );

    if (closestSizeThumbnail) return closestSizeThumbnail.url;

    return photo.imageUrl;
  }, [photo, index, trailingStartingIndex, trailingPhotoWidth]);
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      {!props.isOwnPhoto && props.photo.hasReacted === false && (
        <View style={styles.hasNotReactedIndicator}>
          <Text style={styles.hasNotReactedLabel}>
            {componentsi18n("PhotoListItem.newPhotoLabel")}
          </Text>
        </View>
      )}
      {props.isOwnPhoto && (
        <View style={styles.ownPhotoIndicator}>
          <Icon icon={"user"} width={10} height={10} color={palette.grey600} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    aspectRatio: 1,
    margin: 4,
  },
  image: {
    flexGrow: 1,
    borderRadius: 4,
  },
  hasNotReactedIndicator: {
    position: "absolute",
    left: 4,
    top: 4,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  hasNotReactedLabel: {
    fontFamily: typography.primary,
    fontSize: 12,
    color: palette.green400,
    textAlign: "center",
  },
  ownPhotoIndicator: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "rgba(255,255,255,0.7)",
    height: 20,
    width: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
