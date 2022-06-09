import Constants from "expo-constants";

export const Config = {
  apiBaseUrl: Constants.manifest?.extra?.apiBaseUrl,
  appVersion: "v0.1.51",
  compressedImageWidth: 2000,
  compressedImageHeight: 2000,
  sentryDsn: Constants.manifest?.extra?.sentryDsn,
};
