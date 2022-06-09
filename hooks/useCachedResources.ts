import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Auth } from "../lib/auth";

export default function useCachedResources(
  onReady: (params: { hasCachedToken: boolean }) => void
) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(
    () => {
      async function loadResourcesAndDataAsync() {
        try {
          SplashScreen.preventAutoHideAsync();

          // Load fonts
          await Font.loadAsync({
            ...Ionicons.font,
            "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
            "Bariol-Regular": require("../assets/fonts/Bariol-Regular.otf"),
            "Bariol-Light": require("../assets/fonts/Bariol-Light.otf"),
            "Bariol-Bold": require("../assets/fonts/Bariol-Bold.otf"),
            "Bariol-Thin": require("../assets/fonts/Bariol-Thin.otf"),
            "Bariol-Regular_Italic": require("../assets/fonts/Bariol-Regular_Italic.otf"),
          });

          // Init auth state
          const hasCachedToken = await Auth.initState();
          await onReady({ hasCachedToken });
        } catch (e) {
          // We might want to provide this error information to an error reporting service
          console.warn(e);
        } finally {
          setLoadingComplete(true);
          SplashScreen.hideAsync();
        }
      }

      loadResourcesAndDataAsync();
    },
    [
      /* onReady never changes */
    ]
  );

  return isLoadingComplete;
}
