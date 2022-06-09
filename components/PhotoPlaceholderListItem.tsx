import * as React from "react";
import { StyleSheet, View } from "react-native";
import layout from "../constants/layout";
import { palette } from "../constants/theme";

type PhotoPlaceholderListItemProps = {};

export function PhotoPlaceholderListItem(props: PhotoPlaceholderListItemProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: layout.photoWidth,
    height: layout.photoHeight,
    backgroundColor: palette.grey100,
  },
});
