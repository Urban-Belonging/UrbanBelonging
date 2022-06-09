import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useGlobalState } from "../hooks/useGlobalState";
import AddCustomAnnotationTagModal from "../screens/AddCustomAnnotationTagModal";
import AuthScreen from "../screens/Auth";
import CameraScreen from "../screens/Camera";
import LocationTrackerScreen from "../screens/LocationTracker";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export type RootNavigatorParamList = {
  main: undefined;
  auth: undefined;
  camera: {
    returnLocation: "FeedPhotoDetail" | "LocationTracker";
  };
  locationTracker: undefined;
  addCustomAnnotationTagModal: undefined;
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootNavigatorParamList>();

function RootNavigator() {
  const globalState = useGlobalState();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode={"modal"}>
      {globalState.user ? (
        <Stack.Screen name="main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="auth" component={AuthNavigator} />
      )}
      <Stack.Screen name="camera" component={CameraScreen} />
      <Stack.Screen
        name={"locationTracker"}
        component={LocationTrackerScreen}
      />
      <Stack.Screen
        name="addCustomAnnotationTagModal"
        component={AddCustomAnnotationTagModal}
        options={{
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.35],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
}
