import * as React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { SvgXml } from "react-native-svg";
import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";
import { icons } from "../constants/icons";

export type IconName = keyof typeof icons;

interface IconProps {
  color?: string;
  icon: IconName;
  width: number;
  height: number;
  sloppy?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function Icon(props: IconProps) {
  const { sloppy = true } = props;
  const icon = (
    <SvgXml
      color={props.color || theme.palette.white}
      xml={icons[props.icon]}
      width={props.width || "100%"}
      height={props.width || "100%"}
    />
  );
  if (!props.onPress) return icon;

  return (
    <Pressable
      style={[
        styles.container,
        { width: props.width, height: props.height },
        props.style,
      ]}
      hitSlop={
        sloppy
          ? {
              top: 18,
              left: 18,
              right: 18,
              bottom: 18,
            }
          : undefined
      }
      onPress={props.onPress}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
  },
});
