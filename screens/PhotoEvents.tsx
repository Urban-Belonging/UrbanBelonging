import { NavigationProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { PhotoEventList } from "../components/PhotoEventList";
import { Screen } from "../components/Screen";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { UserGroupsNavigatorParamList } from "../navigation/UserGroupsNavigator";
import { PhotoEvent } from "../types/models";

type PhotoEventsScreenProps = {
  navigation: NavigationProp<UserGroupsNavigatorParamList>;
};

export default function PhotoEventsScreen(props: PhotoEventsScreenProps) {
  const { selectedGroup, selectEvent } = useGlobalState();
  const api = useApi();
  const [isCreationFormOpen, setIsCreationFormOpen] = React.useState(false);
  const [events, setEvents] = React.useState<PhotoEvent[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddPress = React.useCallback(
    () => setIsCreationFormOpen(!isCreationFormOpen),
    [isCreationFormOpen]
  );

  const fetchEvents = React.useCallback(
    async (skipLoading = false) => {
      if (!selectedGroup) return;
      try {
        if (!skipLoading) setIsLoading(true);
        const events = await api.photoEvents.listForGroup(selectedGroup.id);
        setEvents(events);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        if (!skipLoading) setIsLoading(false);
      }
    },
    [selectedGroup]
  );
  const handleCreatePhotoEventSubmit = React.useCallback(
    async (params: {
      name: string;
      contributionPeriodStartsAt: Date;
      contributionPeriodEndsAt: Date;
      reactionPeriodStartsAt: Date;
      reactionPeriodEndsAt: Date;
    }) => {
      if (!selectedGroup) return;
      try {
        setIsLoading(true);
        await api.photoEvents.create({
          ...params,
          group: selectedGroup.id,
        });
        setIsCreationFormOpen(false);
        await fetchEvents();
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedGroup, fetchEvents]
  );

  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await fetchEvents(true);
    setIsRefreshing(false);
  }, [fetchEvents]);

  const handlePhotoEventPress = React.useCallback(
    async (event: PhotoEvent) => {
      selectEvent({
        ...event,
        group: selectedGroup!!,
      });
      // @ts-ignore
      props.navigation.navigate("feed", {
        screen: "photoEventDetail",
      });
    },
    [selectedGroup]
  );

  const handlePhotoEventLongPress = React.useCallback(
    async (event: PhotoEvent) => {
      Alert.alert("Photo Event ID", event.id);
    },
    []
  );

  React.useEffect(() => {
    (async () => {
      await fetchEvents();
    })();
  }, [fetchEvents]);

  return (
    <Screen>
      <Header
        variant={"photoEventList"}
        title={"Photo Tasks"}
        canAdd={selectedGroup?.canCreatePhotoEvents || false}
        canGoBack
        onPressGoBack={props.navigation.goBack}
        onPressAdd={handleAddPress}
      />
      <View style={styles.container}>
        <PhotoEventList
          data={events}
          isLoading={isLoading}
          isCreationFormOpen={isCreationFormOpen}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onCreatePhotoEventSubmit={handleCreatePhotoEventSubmit}
          onItemPress={handlePhotoEventPress}
          onItemLongPress={handlePhotoEventLongPress}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background,
  },
});
