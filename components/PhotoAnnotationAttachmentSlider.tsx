import { Slider } from "@sharcoux/slider";
import * as React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { palette, theme } from "../constants/theme";
import { typography } from "../constants/typography";
import { Text } from "./Text";

const SLIDER_CONTAINER_PADDING = 16;

// @todo cleanup types
export type PhotoAnnotationAttachmentSliderProps =
  | {
      lowLabel: string;
      mediumLabel: string;
      highLabel: string;
      value: number;
      disabled?: boolean;
      onChange: (value: number) => void;
      onDisableScroll: () => void;
      onEnableScroll: () => void;
    }
  | {
      lowLabel: string;
      mediumLabel: string;
      highLabel: string;
      disabled: true;
      value: number;
      onChange?: (value: number) => void;
      onDisableScroll?: () => void;
      onEnableScroll?: () => void;
    };

export function PhotoAnnotationAttachmentSlider(
  props: PhotoAnnotationAttachmentSliderProps
) {
  const { onChange, onEnableScroll, onDisableScroll } = props;
  const [sliderWidth, setSliderWidth] = React.useState(-1);
  const [leftSliderNotchLabelOffset, setLeftSliderNotchLabelOffset] =
    React.useState(0);
  const [centerSliderNotchLabelOffset, setCenterSliderNotchLabelOffset] =
    React.useState(0);

  const handleSliderChange = React.useCallback(
    (value: number) => {
      if (onChange) onChange(Math.round(value));
    },
    [onChange]
  );

  const handleSlidingComplete = React.useCallback(() => {
    if (onEnableScroll) onEnableScroll();
  }, [onEnableScroll]);

  const handleSliderLayout = React.useCallback((e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  }, []);

  const handleLeftSliderNotchLabelLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      setLeftSliderNotchLabelOffset(e.nativeEvent.layout.width / 2);
    },
    []
  );

  const handleCenterSliderNotchLabelLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      setCenterSliderNotchLabelOffset(e.nativeEvent.layout.width / 2);
    },
    []
  );

  return (
    <View
      style={styles.container}
      pointerEvents={props.disabled ? "none" : "auto"}
      onLayout={handleSliderLayout}
    >
      <Text
        style={[
          styles.notchText,
          { left: SLIDER_CONTAINER_PADDING - leftSliderNotchLabelOffset },
        ]}
        onLayout={handleLeftSliderNotchLabelLayout}
      >
        {props.lowLabel}
      </Text>
      <Text
        style={[
          styles.notchText,
          { left: sliderWidth * 0.5 - centerSliderNotchLabelOffset },
        ]}
        onLayout={handleCenterSliderNotchLabelLayout}
      >
        {props.mediumLabel}
      </Text>
      <Text style={[styles.notchText, { right: 0 }]}>{props.highLabel}</Text>
      <Slider
        value={props.value}
        minimumValue={1}
        maximumValue={5}
        step={1}
        minimumTrackTintColor={
          props.disabled ? palette.green300 : theme.palette.primary
        }
        maximumTrackTintColor={palette.grey75}
        trackHeight={props.disabled ? 12 : 10}
        thumbTintColor={palette.white}
        slideOnTap={false}
        thumbStyle={props.disabled ? styles.disabledThumb : styles.activeThumb}
        style={styles.slider}
        thumbSize={24}
        onSlidingStart={onDisableScroll}
        onSlidingComplete={handleSlidingComplete}
        onValueChange={handleSliderChange}
      />
      {props.value !== 1 && (
        <View style={[styles.notch, { left: SLIDER_CONTAINER_PADDING + 3 }]} />
      )}
      {props.value !== 2 && (
        <View
          style={[
            styles.notch,
            { left: sliderWidth * 0.25 + SLIDER_CONTAINER_PADDING / 2 - 1 },

            props.value < 2 &&
              (props.disabled ? styles.disabledNotch : styles.highlightedNotch),
          ]}
        />
      )}
      {props.value !== 3 && (
        <View
          style={[
            styles.notch,
            { left: sliderWidth * 0.5 - 2 },
            props.value < 3 &&
              (props.disabled ? styles.disabledNotch : styles.highlightedNotch),
          ]}
        />
      )}
      {props.value !== 4 && (
        <View
          style={[
            styles.notch,
            {
              left: sliderWidth * 0.75 - SLIDER_CONTAINER_PADDING / 2 - 3.5,
            },
            props.value < 4 &&
              (props.disabled ? styles.disabledNotch : styles.highlightedNotch),
          ]}
        />
      )}
      {props.value !== 5 && (
        <View
          style={[
            styles.notch,
            { right: SLIDER_CONTAINER_PADDING + 3 },
            props.value < 5 &&
              (props.disabled ? styles.disabledNotch : styles.highlightedNotch),
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "stretch",
    overflow: "visible",
    marginVertical: 32,
    paddingHorizontal: SLIDER_CONTAINER_PADDING,
    position: "relative",
  },
  slider: {
    alignSelf: "stretch",
    paddingVertical: 16,
  },
  notch: {
    backgroundColor: palette.white,
    width: 4,
    height: 4,
    position: "absolute",
    top: "50%",
    transform: [
      {
        translateY: -2,
      },
    ],
    borderRadius: 4,
  },
  highlightedNotch: {
    backgroundColor: theme.palette.primary,
  },
  disabledNotch: {
    backgroundColor: palette.green300,
  },
  notchText: {
    fontSize: 14,
    fontFamily: typography.primary,
    color: palette.grey500,
    position: "absolute",
    top: -24,
  },
  disabledThumb: {
    backgroundColor: palette.green300,
  },
  activeThumb: {
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 13,
    elevation: 5,
    overflow: "visible",
  },
});
