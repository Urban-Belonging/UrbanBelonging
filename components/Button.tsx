import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

type ButtonProps = {
  text: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  icon?: IconName;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export function Button(props: ButtonProps) {
  const { isLoading = false } = props;
  return (
    <Pressable
      {...props}
      style={[styles.container, props.disabled && styles.disabled, props.style]}
      onPress={!isLoading ? props.onPress : undefined}
    >
      {!isLoading && props.icon && (
        <Icon icon={props.icon} width={16} height={16} color={palette.white} />
      )}
      {!isLoading ? (
        <Text
          style={[
            styles.text,
            props.textStyle,
            props.icon && styles.textWithIcon,
          ]}
        >
          {props.text}
        </Text>
      ) : (
        <ActivityIndicator size={"small"} color={theme.palette.white} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: theme.palette.primary,
  },
  text: {
    color: theme.palette.white,
    fontFamily: typography.primaryBold,
  },
  disabled: {
    backgroundColor: "#CCC",
  },
  textWithIcon: {
    marginLeft: 10,
  },
});
