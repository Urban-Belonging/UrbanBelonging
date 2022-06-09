import { NavigationProp, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { PhotoList } from "../components/PhotoList";
import { Screen } from "../components/Screen";
import { theme } from "../constants/theme";
import { useApi } from "../hooks/useApi";
import { useGlobalState } from "../hooks/useGlobalState";
import { screeni18n } from "../lib/i18n";
import { FeedNavigatorParamList } from "../navigation/FeedNavigator";
import { Photo } from "../types/models";

type FeedPhotoEventDetailProps = {
  navigation: NavigationProp<FeedNavigatorParamList>;
  route: RouteProp<FeedNavigatorParamList, "photoEventDetail">;
};

const defaultPagination = {
  skip: 0,
  limit: 50,
  total: -1,
};

export default function FeedPhotoEventDetail(props: FeedPhotoEventDetailProps) {
  const {
    selectedEvent,
    selectPhoto,
    selectedPhoto,
    shouldRefreshPhotoList,
    setShouldRefreshPhotoList,
    recentlyReactedPhotoIds,
    user,
  } = useGlobalState();
  const api = useApi();
  const photosStable = React.useRef<Photo[]>([]);
  const pagination = React.useRef(defaultPagination);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const fetchPhotos = React.useCallback(
    async (eventId: string, skipLoading = false, reset = false) => {
      try {
        if (!skipLoading) setIsLoading(true);

        const response = await api.photos.listForEvent(
          eventId,
          pagination.current.skip,
          pagination.current.limit
        );

        if (reset) {
          photosStable.current = [...response.result];
        } else {
          photosStable.current = [...photosStable.current, ...response.result];
        }

        setPhotos(photosStable.current);
        pagination.current = {
          ...pagination.current,
          skip: response.skip,
          limit: response.limit,
          total: response.total,
        };

        if (!skipLoading) setIsLoading(false);

        return response.result;
      } catch (err) {
        console.error(err);

        Alert.alert(
          screeni18n("FeedPhotoEventDetail.unknownErrorTitle"),
          screeni18n("FeedPhotoEventDetail.unknownErrorMessage")
        );
        if (!skipLoading) setIsLoading(false);
      }
    },
    []
  );

  const handleItemPress = React.useCallback((photo: Photo) => {
    selectPhoto(photo);
    props.navigation.navigate("photoDetail");
  }, []);

  const handleRefresh = React.useCallback(async () => {
    if (!selectedEvent) return;
    pagination.current = {
      ...defaultPagination,
    };
    setIsRefreshing(true);
    await fetchPhotos(selectedEvent.id, true, true);
    setIsRefreshing(false);
  }, [selectedEvent, fetchPhotos]);

  const handleJoinEventPress = React.useCallback(() => {
    props.navigation.navigate("activePhotoEvent");
  }, []);

  const handleStartSliderReactionPress = React.useCallback(() => {
    props.navigation.navigate("photoEventSliderReaction");
  }, []);

  const handleViewWalksPress = React.useCallback(() => {
    props.navigation.navigate("photoEventWalks");
  }, []);

  const handleFetchMore = React.useCallback(async () => {
    if (
      photosStable.current.length >= pagination.current.total ||
      !selectedEvent
    ) {
      return;
    }

    pagination.current = {
      ...pagination.current,
      skip: pagination.current.skip + pagination.current.limit,
    };

    await fetchPhotos(selectedEvent.id, true);
  }, [fetchPhotos, selectedEvent]);

  React.useEffect(() => {
    (async () => {
      if (!selectedEvent) return;
      await fetchPhotos(selectedEvent.id, false, true);
    })();
  }, [selectedEvent]);

  React.useEffect(() => {
    /**
     * If the selected photo changed, update the one in the photos array.
     * This is a bit of a shoehorn mechanism to ensure when a user adds
     * an annotation the data in the list is also updated.
     */
    if (selectedPhoto) {
      setPhotos(
        photosStable.current.map((photo) => {
          if (photo.id === selectedPhoto.id) return selectedPhoto;
          return photo;
        })
      );
    }
  }, [selectedPhoto]);

  React.useEffect(() => {
    if (!recentlyReactedPhotoIds.length) return;

    setPhotos(
      photosStable.current.map((photo) => {
        return {
          ...photo,
          hasReacted: !photo.hasReacted
            ? recentlyReactedPhotoIds.includes(photo.id)
            : photo.hasReacted,
        };
      })
    );
  }, [recentlyReactedPhotoIds]);

  React.useEffect(() => {
    if (shouldRefreshPhotoList && selectedEvent) {
      const eventId = selectedEvent.id;
      setShouldRefreshPhotoList(false);

      (async () => {
        await fetchPhotos(eventId, false, true);
      })();
    }
  }, [shouldRefreshPhotoList, selectedEvent]);

  return (
    <Screen
      header={
        <Header
          variant={"feedPhotoEventDetail"}
          title={selectedEvent?.name}
          canGoBack
          onPressGoBack={props.navigation.goBack}
          onPressViewWalks={handleViewWalksPress}
        />
      }
    >
      <View style={styles.container}>
        {
          <PhotoList
            data={photos}
            userId={user?.id}
            event={selectedEvent!}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            onItemPress={handleItemPress}
            onStartSliderReaction={handleStartSliderReactionPress}
            onJoinEvent={handleJoinEventPress}
            onFetchMore={handleFetchMore}
          />
        }
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
