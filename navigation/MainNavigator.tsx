import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Localization from "expo-localization";
import * as React from "react";
import { Alert } from "react-native";
import type { RootNavigatorParamList } from ".";
import { Icon } from "../components/Icon";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { PushNotifications } from "../lib/pushNotifications";
import FeedNavigator from "./FeedNavigator";
import ProfileNavigator from "./ProfileNavigator";
import UserGroupsNavigator from "./UserGroupsNavigator";

export type MainNavigatorParamList = {
  feed: undefined;
  userGroups: undefined;
  profile: undefined;
} & RootNavigatorParamList;

const BottomTab = createBottomTabNavigator<MainNavigatorParamList>();

export default function MainNavigator() {
  const { user } = useGlobalState();
  const api = useApi();

  React.useEffect(() => {
    (async () => {
      try {
        const deviceToken = await PushNotifications.register();
        if (deviceToken) {
          await api.auth.registerDeviceToken(deviceToken);
        }
      } catch (err) {
        console.error(err);
        Alert.alert("Error", err.message);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (user && !user.locale) {
      (async () => {
        try {
          await api.auth.updateLocale(Localization.locale);
        } catch (err) {
          console.error(`Could not update locale: ${err.message}`);
        }
      })();
    }
  }, [user]);

  return (
    <BottomTab.Navigator
      initialRouteName="feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "feed":
              return (
                <Icon icon={"logo"} width={size} height={size} color={color} />
              );
            case "userGroups":
              return (
                <Icon
                  icon={"groups"}
                  width={size}
                  height={size}
                  color={color}
                />
              );
            case "profile":
              return (
                <Icon icon={"user"} width={20} height={size} color={color} />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.palette.primary,
        inactiveTintColor: theme.palette.white,
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: theme.palette.secondary,
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTab.Screen name="feed" component={FeedNavigator} />
      {user?.role === "admin" && (
        <BottomTab.Screen name="userGroups" component={UserGroupsNavigator} />
      )}
      <BottomTab.Screen name="profile" component={ProfileNavigator} />
    </BottomTab.Navigator>
  );
}
