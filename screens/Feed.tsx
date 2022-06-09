import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Screen } from "../components/Screen";
import { SuggestedPhotoEventList } from "../components/SuggestedPhotoEventList";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import {
  useNotificationHandler,
  useNotificationReceivedInForeground,
  useNotificationWasTapped,
} from "../lib/pushNotifications";
import { FeedNavigatorParamList } from "../navigation/FeedNavigator";
import { PhotoEventWithMetadata } from "../types/models";

type FeedScreenProps = {
  navigation: NavigationProp<FeedNavigatorParamList>;
  route: RouteProp<FeedNavigatorParamList, "index">;
};

export default function FeedScreen(props: FeedScreenProps) {
  const {
    selectedEvent,
    checkEventIsActive,
    selectEvent,
    shouldRefreshFeed,
    setShouldRefreshFeed,
  } = useGlobalState();
  const activeEventCheckTimer = React.useRef<NodeJS.Timeout>();
  const api = useApi();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const suggestedEventsStable = React.useRef<PhotoEventWithMetadata[]>([]);
  const [suggestedEvents, setSuggestedEvents] = React.useState<
    PhotoEventWithMetadata[]
  >([]);

  useNotificationHandler(async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }));

  const fetchSuggestedEvents = React.useCallback(
    async (skipLoading = false) => {
      try {
        if (!skipLoading) setIsLoading(true);

        const response = await api.feed.getSuggestedEvents();
        suggestedEventsStable.current = response;
        setSuggestedEvents(response);
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("Feed.fetchPhotoEventsErrorTitle"),
          screeni18n("Feed.fetchPhotoEventsErrorMessage")
        );
      } finally {
        if (!skipLoading) setIsLoading(false);
      }
    },
    []
  );

  React.useEffect(() => {
    (async () => {
      await fetchSuggestedEvents();
    })();
  }, []);

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await fetchSuggestedEvents(true);
    setIsRefreshing(false);
  }, [fetchSuggestedEvents]);

  const handlePhotoEventPress = React.useCallback(
    (event: PhotoEventWithMetadata) => {
      selectEvent(event);
      props.navigation.navigate("photoEventDetail");
    },
    [props.navigation]
  );

  React.useEffect(() => {
    if (
      selectedEvent &&
      !suggestedEventsStable.current.find(
        (event) => event.id === selectedEvent.id
      )
    ) {
      fetchSuggestedEvents();
    }
  }, [selectedEvent]);

  useFocusEffect(
    React.useCallback(() => {
      /**
       * Check if the event is active immediately. By calling this function,
       * the global state will update to indicate in which periods the event
       * is active. The state updates will then trickle down to this component
       * which will re-render to show the relevant CTA
       */
      checkEventIsActive();
      /**
       * Check if this event is active every 10s
       */
      activeEventCheckTimer.current = setInterval(checkEventIsActive, 10000);
      return () => {
        // Stop checking if the event is active when this screen is no longer focused
        if (activeEventCheckTimer.current) {
          clearInterval(activeEventCheckTimer.current);
        }
      };
    }, [checkEventIsActive])
  );

  useNotificationReceivedInForeground(async (event) => {
    console.log("useNotificationReceivedInForeground", event);
    setIsRefreshing(true);
    await fetchSuggestedEvents(true);
    setIsRefreshing(false);
  });
  useNotificationWasTapped(async (data) => {
    switch (data.notificationType) {
      case "photo-event:contribution:starting":
      case "photo-event:reaction:starting":
        if (!selectedEvent || selectedEvent.id !== data.photoEventId) {
          const eventForNotification = await api.photoEvents.get(
            data.photoEventId
          );
          selectEvent(eventForNotification);
        }

        // @ts-ignore
        props.navigation.navigate("feed", {
          screen: "photoEventDetail",
        });
    }
  });

  React.useEffect(() => {
    if (shouldRefreshFeed) {
      setShouldRefreshFeed(false);
      (async () => {
        await fetchSuggestedEvents();
      })();
    }
  }, [shouldRefreshFeed]);

  return (
    <Screen header={null}>
      <View style={styles.container}>
        <SuggestedPhotoEventList
          data={suggestedEvents}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onItemPress={handlePhotoEventPress}
          onRefresh={handleRefresh}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.white,
  },
  emptyContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: theme.palette.secondary,
  },
});
