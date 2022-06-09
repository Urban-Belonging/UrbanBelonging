import type {
  AnnotationAnswer,
  AnnotationPrompt,
  CapturePrompt,
  ReactionAnswer,
  ReactionPrompt,
} from "../lib/prompts";

export interface BaseDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Thumbnail {
  size: number;
  url: string;
}

export type PhotoLocationData = {
  latitude: string;
  longitude: string;
} | null;

export interface Photo extends BaseDocument {
  imageUrl: string;
  hasReacted?: boolean;
  createdBy: string;
  locationData: PhotoLocationData;
  annotationPrompts: AnnotationPrompt[];
  annotationAnswers?: AnnotationAnswer[];
  reactionPrompts: ReactionPrompt[];
  thumbnails: Thumbnail[];
}

export interface PhotoEvent extends BaseDocument {
  name: string;
  group: string;
  contributionPeriodIsActive: boolean;
  reactionPeriodIsActive: boolean;
  isActive: boolean;
  capturePrompt: CapturePrompt;
  annotationPrompts: AnnotationPrompt[];
  reactionPrompts: ReactionPrompt[];
  contributionPeriodStartsAt: Date;
  contributionPeriodEndsAt: Date;
  reactionPeriodStartsAt: Date;
  reactionPeriodEndsAt: Date;
  startsAt: Date;
  endsAt: Date;
}

export type PhotoEventWithMetadata = Omit<PhotoEvent, "group"> & {
  group: UserGroup;
  photos: Pick<Photo, "imageUrl" | "thumbnails" | "id">[];
  photoCount: number;
};

export type PhotoEventWithGroup = Omit<PhotoEvent, "group"> & {
  group: UserGroup;
};

export interface UserGroup extends BaseDocument {
  name: string;
  canCreatePhotoEvents: boolean;
  canInviteMembers: boolean;
}

export type UserRole = "admin" | "user";
export interface User extends BaseDocument {
  email: string;
  username: string;
  role: UserRole;
  locale: string | null;
}

export interface UserGroupMember {
  id: string;
  username: string;
  canCreatePhotoEvents: boolean;
  canInviteMembers: boolean;
}

export interface PhotoReaction extends BaseDocument {
  answers: ReactionAnswer[];
  prompts: ReactionPrompt[];
  photo: string;
  createdBy: string;
}

export interface LocationDataPoint {
  latitude: string;
  longitude: string;
}

export type LocationDataPointWithTimestamp<T = Date> = LocationDataPoint & {
  timestamp: T;
};

export type PhotoEventWalkStatus = "pending" | "in-progress" | "completed";

export interface PhotoEventWalk extends BaseDocument {
  name: string;
  status: PhotoEventWalkStatus;
  distance: number;
  duration: number;
  startedAt: Date;
  endedAt: Date;
  event: string;
  createdBy: string;
}

export type PhotoEventWalkWithPhotos = Omit<PhotoEventWalk, "locationData"> & {
  photos: Photo[];
};

export type PhotoEventWalkWithLocationData = PhotoEventWalk & {
  locationData: LocationDataPointWithTimestamp[];
};
