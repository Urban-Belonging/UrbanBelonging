import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { GlobalStateContext } from "./hooks/useGlobalState";
import { API } from "./lib/api";
import Navigation from "./navigation";
import {
  Photo,
  PhotoEventWalk,
  PhotoEventWithGroup,
  PhotoEventWithMetadata,
  User,
  UserGroup,
} from "./types/models";
import { getEventActiveStatus } from "./utils/photo-event";

import * as Sentry from "sentry-expo";
import { Config } from "./lib/config";

Sentry.init({
  dsn: Config.sentryDsn,
  enableInExpoDevelopment: true,
  debug: false,
});

export default function App() {
  const api = React.useRef(new API());
  const [user, setUser] = React.useState<User | null>(null);
  const selectedEventStable = React.useRef<
    PhotoEventWithMetadata | PhotoEventWithGroup | null
  >(null);
  const [selectedEvent, setSelectedEvent] = React.useState<
    PhotoEventWithMetadata | PhotoEventWithGroup | null
  >(null);
  const [selectedGroup, setSelectedGroup] = React.useState<UserGroup | null>(
    null
  );
  const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null);
  const [selectedWalk, setSelectedWalk] = React.useState<PhotoEventWalk | null>(
    null
  );
  const deviceToken = React.useRef<string | null>(null);
  const [isTrackingLocation, setIsTrackingLocation] = React.useState(false);
  const [shouldRefreshPhotoList, setShouldRefreshPhotoList] =
    React.useState<boolean>(false);
  const [shouldRefreshFeed, setShouldRefreshFeed] =
    React.useState<boolean>(false);
  const [customAnnotationTag, setCustomAnnotationTag] = React.useState<
    string | null
  >(null);
  const [recentlyReactedPhotoIds, setRecentlyReactedPhotoIds] = React.useState<
    string[]
  >([]);

  const handleCheckEventIsActive = React.useCallback(() => {
    // We use a stable ref to avoid infinite loops
    if (!selectedEventStable.current) return;

    const activeStatus = getEventActiveStatus(selectedEventStable.current);
    const { contributionPeriodIsActive, reactionPeriodIsActive, isActive } =
      selectedEventStable.current;

    // Check equality to avoid unnecessary re-renders
    if (
      contributionPeriodIsActive !== activeStatus.contributionPeriodIsActive ||
      reactionPeriodIsActive !== activeStatus.reactionPeriodIsActive ||
      isActive !== activeStatus.isActive
    ) {
      const event = {
        ...selectedEventStable.current,
        ...activeStatus,
      };
      selectedEventStable.current = event;
      setSelectedEvent(event);
    }
  }, []);

  const handleSelectEvent = React.useCallback(
    (event: PhotoEventWithMetadata | PhotoEventWithGroup | null) => {
      setRecentlyReactedPhotoIds([]);
      selectedEventStable.current = event;
      setSelectedEvent(event);
    },
    []
  );

  const handleSetDeviceToken = React.useCallback(
    (token: string | null) => (deviceToken.current = token),
    []
  );

  const handlePhotoWasReactedTo = React.useCallback(
    (photoId: string) => {
      setRecentlyReactedPhotoIds([...recentlyReactedPhotoIds, photoId]);
    },
    [recentlyReactedPhotoIds]
  );

  const isLoadingComplete = useCachedResources(async ({ hasCachedToken }) => {
    if (!hasCachedToken) return;

    try {
      const authenticatedUser = await api.current.auth.me();
      setUser(authenticatedUser);
    } catch (err) {
      // Cached token wasn't valid, nothing to do here (the user will stay in the AuthNavigator)
    }
  });

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <GlobalStateContext.Provider
        value={{
          api: api.current,
          user,
          setUser,
          selectedEvent,
          selectEvent: handleSelectEvent,
          selectedGroup,
          selectGroup: setSelectedGroup,
          selectedPhoto,
          selectPhoto: setSelectedPhoto,
          selectedWalk,
          selectWalk: setSelectedWalk,
          deviceToken: deviceToken.current,
          setDeviceToken: handleSetDeviceToken,
          isTrackingLocation,
          setIsTrackingLocation,
          shouldRefreshPhotoList,
          setShouldRefreshPhotoList,
          shouldRefreshFeed,
          setShouldRefreshFeed,
          checkEventIsActive: handleCheckEventIsActive,
          customAnnotationTag,
          setCustomAnnotationTag,
          recentlyReactedPhotoIds,
          setPhotoWasReactedTo: handlePhotoWasReactedTo,
        }}
      >
        <Navigation />
        <StatusBar style={"light"} />
      </GlobalStateContext.Provider>
    </SafeAreaProvider>
  );
}
