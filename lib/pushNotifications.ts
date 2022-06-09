import * as Notifications from "expo-notifications";
import { Subscription } from "@unimodules/core";
import React from "react";
import { Alert, Platform } from "react-native";

export const PushNotifications = {
  async register() {
    const hasPermissions = await Notifications.getPermissionsAsync();

    if (!hasPermissions.granted) {
      const permissionsRequestResponse =
        await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
          },
        });

      if (!permissionsRequestResponse.granted) {
        Alert.alert(
          "Push Notifications",
          "Notifications need to be enabled for the app to function properly"
        );
        return null;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        // @todo fix push color
        lightColor: "#FF231F7C",
      });
    }

    return token.data;
  },
};

export function useNotificationReceivedInForeground(
  callback: (event: Notifications.Notification) => void
) {
  const listener = React.useRef<Subscription>();

  React.useEffect(() => {
    listener.current = Notifications.addNotificationReceivedListener(callback);

    return () => {
      if (listener.current) {
        Notifications.removeNotificationSubscription(listener.current);
      }
    };
  }, []);
}

export function useNotificationWasTapped(
  callback: (notificationData: PushNotificationData) => void
) {
  const listener = React.useRef<Subscription>();

  React.useEffect(() => {
    listener.current = Notifications.addNotificationResponseReceivedListener(
      (event: Notifications.NotificationResponse) => {
        callback(
          event.notification.request.content
            .data as unknown as PushNotificationData
        );
      }
    );

    return () => {
      if (listener.current) {
        Notifications.removeNotificationSubscription(listener.current);
      }
    };
  }, []);
}

export function useNotificationHandler(
  callback: () => Promise<{
    shouldShowAlert: boolean;
    shouldPlaySound: boolean;
    shouldSetBadge: boolean;
  }>
) {
  React.useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: callback,
    });
  }, []);
}

interface PushNotificationData {
  notificationType:
    | "photo-event:contribution:starting"
    | "photo-event:reaction:starting";
  photoEventId: string;
  photoEventTitle: string;
  groupId: string;
}
