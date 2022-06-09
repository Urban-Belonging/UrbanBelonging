import { Platform } from "react-native";

export const typography = {
  primary: Platform.select({
    ios: "Bariol-Regular",
    android: "Bariol-Regular",
  }),
  primaryBold: Platform.select({
    ios: "Bariol-Bold",
    android: "Bariol-Bold",
  }),
};
