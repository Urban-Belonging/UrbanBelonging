import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import PhotoEventsScreen from "../screens/PhotoEvents";
import UserGroupMembersScreen from "../screens/UserGroupMembers";
import UserGroupsScreen from "../screens/UserGroups";
import type { MainNavigatorParamList } from "./MainNavigator";

type ParamList = {
  userGroupList: undefined;
  userGroupMembersList: undefined;
  photoEventsList: undefined;
};

export type UserGroupsNavigatorParamList = ParamList & MainNavigatorParamList;

const Stack = createStackNavigator<ParamList>();

export default function UserGroupsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userGroupList" component={UserGroupsScreen} />
      <Stack.Screen
        name="userGroupMembersList"
        component={UserGroupMembersScreen}
      />
      <Stack.Screen name="photoEventsList" component={PhotoEventsScreen} />
    </Stack.Navigator>
  );
}
