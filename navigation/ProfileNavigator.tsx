import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import type { MainNavigatorParamList } from "./MainNavigator";

type ParamList = {
  profile: undefined;
  settings: undefined;
};

export type ProfileNavigatorParamList = ParamList & MainNavigatorParamList;

const Stack = createStackNavigator<ParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
