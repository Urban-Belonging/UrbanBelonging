import * as IntentLauncher from "expo-intent-launcher";
import { Linking, Platform } from "react-native";

const ANDROID_PACKAGE_NAME = __DEV__
  ? "host.exp.exponent"
  : "com.urbanbelonging.app";

export function openAppSettings() {
  if (Platform.OS === "android") {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
      { data: `package:${ANDROID_PACKAGE_NAME}` }
    );
  } else if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  }
}
