import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { PhotoEventWalkList } from "../components/PhotoEventWalkList";
import { Screen } from "../components/Screen";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { FeedNavigatorParamList } from "../navigation/FeedNavigator";
import { PhotoEventWalkWithPhotos } from "../types/models";

type FeedPhotoEventWalksProps = {
  navigation: NavigationProp<FeedNavigatorParamList>;
  route: RouteProp<FeedNavigatorParamList, "photoEventWalks">;
};

export default function FeedPhotoEventWalks(props: FeedPhotoEventWalksProps) {
  const { selectedEvent, selectWalk } = useGlobalState();
  const { navigation } = props;
  const api = useApi();
  const [walks, setWalks] = React.useState<PhotoEventWalkWithPhotos[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const fetchWalks = React.useCallback(
    async (eventId: string, skipLoading = false) => {
      try {
        if (!skipLoading) setIsLoading(true);
        const response = await api.photoEventWalks.list(eventId);
        setWalks(response);

        if (!skipLoading) setIsLoading(false);

        return response;
      } catch (err) {
        console.error(err);
        Alert.alert(
          screeni18n("FeedPhotoEventWalks.fetchWalksErrorTitle"),
          screeni18n("FeedPhotoEventWalks.fetchWalksErrorMessage")
        );
        if (!skipLoading) setIsLoading(false);
      }
    },
    []
  );

  const handleRefresh = React.useCallback(async () => {
    if (!selectedEvent) return;
    setIsRefreshing(true);
    await fetchWalks(selectedEvent.id, true);
    setIsRefreshing(false);
  }, [selectedEvent, fetchWalks]);

  const handleItemPress = React.useCallback(
    (walk: PhotoEventWalkWithPhotos) => {
      selectWalk(walk);
      navigation.navigate("photoEventWalkPreview");
    },
    [navigation]
  );

  React.useEffect(() => {
    (async () => {
      if (!selectedEvent) return;
      await fetchWalks(selectedEvent.id);
    })();
  }, [selectedEvent]);

  return (
    <Screen
      header={
        <Header
          variant={"feedPhotoEventWalks"}
          canGoBack
          onPressGoBack={props.navigation.goBack}
        />
      }
    >
      <View style={styles.container}>
        <PhotoEventWalkList
          data={walks}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onItemPress={handleItemPress}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },
});
