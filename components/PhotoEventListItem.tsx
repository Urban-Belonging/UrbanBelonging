import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import layout from "../constants/layout";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { PhotoEvent } from "../types/models";
import { formatDate } from "../utils/date";
import { Text } from "./Text";

type PhotoEventListItemProps = {
  event: PhotoEvent;
  onPress: (event: PhotoEvent) => void;
  onLongPress: (event: PhotoEvent) => void;
};

export function PhotoEventListItem(props: PhotoEventListItemProps) {
  const { event, onPress, onLongPress } = props;
  const handlePress = React.useCallback(() => onPress(event), [event, onPress]);
  const handleLongPress = React.useCallback(
    () => onLongPress(event),
    [event, onLongPress]
  );
  const hasStarted = React.useMemo(
    () => Date.now() > event.startsAt.valueOf(),
    [event]
  );
  const subtitle = React.useMemo(() => {
    if (event.contributionPeriodIsActive) return "Add your photos!";
    if (event.reactionPeriodIsActive) return "React to other's photos!";
    return `${formatDate(event.startsAt)} - ${formatDate(event.endsAt)}`;
  }, [event]);

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Text
        style={[
          styles.title,
          (event.isActive || !hasStarted) && styles.titleActive,
        ]}
      >
        {props.event.name}
      </Text>
      <Text
        style={[
          styles.subtitle,
          !hasStarted && styles.subtitleStartsInFuture,
          event.isActive && styles.subtitleActive,
        ]}
      >
        {subtitle}
      </Text>
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
    borderBottomWidth: 2,
    borderBottomColor: palette.grey100,
    padding: theme.spacing[5],
  },
  title: {
    fontFamily: typography.primary,
    color: palette.blue200,
    fontSize: 18,
  },
  titleActive: {
    fontFamily: typography.primaryBold,
  },
  subtitle: {
    fontFamily: typography.primary,
    color: palette.blue200,
    fontSize: 14,
    marginTop: theme.spacing[2],
  },
  subtitleStartsInFuture: {
    fontFamily: typography.primaryBold,
  },
  subtitleActive: {
    color: palette.green100,
    fontFamily: typography.primaryBold,
  },
});
