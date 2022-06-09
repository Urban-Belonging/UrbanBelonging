import * as React from "react";
import { API } from "../lib/api";
import {
  Photo,
  PhotoEventWalk,
  PhotoEventWithGroup,
  PhotoEventWithMetadata,
  User,
  UserGroup,
} from "../types/models";

const noop = () => {};

interface GlobalStateContextValue {
  api: API;
  user: User | null;
  setUser: (user: User | null) => void;
  selectedEvent: PhotoEventWithMetadata | PhotoEventWithGroup | null;
  selectEvent: (
    event: PhotoEventWithMetadata | PhotoEventWithGroup | null
  ) => void;
  selectedGroup: UserGroup | null;
  selectGroup: (group: UserGroup) => void;
  selectedPhoto: Photo | null;
  selectPhoto: (photo: Photo | null) => void;
  selectedWalk: PhotoEventWalk | null;
  selectWalk: (walk: PhotoEventWalk | null) => void;
  deviceToken: string | null;
  setDeviceToken: (token: string | null) => void;
  isTrackingLocation: boolean;
  setIsTrackingLocation: (isTracking: boolean) => void;
  shouldRefreshPhotoList: boolean;
  setShouldRefreshPhotoList: (shouldRefresh: boolean) => void;
  shouldRefreshFeed: boolean;
  setShouldRefreshFeed: (shouldRefresh: boolean) => void;
  checkEventIsActive: () => void;
  customAnnotationTag: string | null;
  setCustomAnnotationTag: (tag: string | null) => void;
  recentlyReactedPhotoIds: string[];
  setPhotoWasReactedTo: (photoId: string) => void;
}

export const GlobalStateContext = React.createContext<GlobalStateContextValue>({
  api: new API(),
  user: null,
  setUser: noop,
  selectedEvent: null,
  selectEvent: noop,
  selectedGroup: null,
  selectGroup: noop,
  selectedPhoto: null,
  selectPhoto: noop,
  selectedWalk: null,
  selectWalk: noop,
  checkEventIsActive: noop,
  deviceToken: null,
  setDeviceToken: noop,
  isTrackingLocation: false,
  setIsTrackingLocation: noop,
  shouldRefreshPhotoList: false,
  setShouldRefreshPhotoList: noop,
  shouldRefreshFeed: false,
  setShouldRefreshFeed: noop,
  customAnnotationTag: null,
  setCustomAnnotationTag: noop,
  recentlyReactedPhotoIds: [],
  setPhotoWasReactedTo: noop,
});

export function useGlobalState() {
  const state = React.useContext(GlobalStateContext);

  return state;
}
