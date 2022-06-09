import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import FeedScreen from "../screens/Feed";
import FeedActivePhotoEventScreen from "../screens/FeedActivePhotoEvent";
import FeedPhotoDetailScreen from "../screens/FeedPhotoDetail";
import FeedPhotoEventDetailScreen from "../screens/FeedPhotoEventDetail";
import FeedPhotoEventSliderReactionScreen from "../screens/FeedPhotoEventSliderReaction";
import FeedPhotoEventWalksScreen from "../screens/FeedPhotoEventWalks";
import PhotoEventWalkPreviewScreen from "../screens/PhotoEventWalkPreview";
import type { MainNavigatorParamList } from "./MainNavigator";

type ParamList = {
  index: undefined;
  photoEventDetail: undefined;
  activePhotoEvent: undefined;
  photoDetail: undefined;
  photoEventWalkPreview: undefined;
  photoEventSliderReaction: undefined;
  photoEventWalks: undefined;
};

export type FeedNavigatorParamList = ParamList & MainNavigatorParamList;

const Stack = createStackNavigator<ParamList>();

export default function FeedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"index"} component={FeedScreen} />
      <Stack.Screen
        name={"photoEventDetail"}
        component={FeedPhotoEventDetailScreen}
      />
      <Stack.Screen
        name={"photoEventWalks"}
        component={FeedPhotoEventWalksScreen}
      />
      <Stack.Screen
        name={"photoEventWalkPreview"}
        component={PhotoEventWalkPreviewScreen}
      />
      <Stack.Screen
        name={"activePhotoEvent"}
        component={FeedActivePhotoEventScreen}
      />
      <Stack.Screen name={"photoDetail"} component={FeedPhotoDetailScreen} />
      <Stack.Screen
        name={"photoEventSliderReaction"}
        component={FeedPhotoEventSliderReactionScreen}
      />
    </Stack.Navigator>
  );
}
