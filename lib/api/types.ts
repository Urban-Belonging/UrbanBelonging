import {
  LocationDataPointWithTimestamp,
  PhotoEventWalkStatus,
  PhotoLocationData,
  UserRole,
} from "../../types/models";
import type {
  AnnotationAnswer,
  AnnotationPrompt,
  CapturePrompt,
  ReactionAnswer,
  ReactionPrompt,
} from "../prompts";

/**
 * API
 */
export interface BaseAPIDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type PaginationResponse<T> = {
  limit: number;
  skip: number;
  total: number;
  result: T[];
};

export interface Thumbnail {
  size: number;
  url: string;
}

/**
 * User
 */
export interface UserResponse extends BaseAPIDocument {
  username: string;
  email: string;
  role: UserRole;
  locale: string | null;
}

/**
 * UserGroup
 */
export interface UserGroupResponse extends BaseAPIDocument {
  name: string;
  canCreatePhotoEvents: boolean;
  canInviteMembers: boolean;
}

export interface UserGroupMemberResponse {
  id: string;
  username: string;
  canCreatePhotoEvents: boolean;
  canInviteMembers: boolean;
}

/**
 * Auth
 */
export interface AuthenticatedResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyActivationCodeResponse {
  type: "UserRegistration" | "UserGroupInvitation" | "UserPasswordResetRequest";
}

/**
 * PhotoEvent
 */
export interface PhotoEventResponse extends BaseAPIDocument {
  name: string;
  group: string;
  capturePrompt: CapturePrompt;
  annotationPrompts: AnnotationPrompt[];
  reactionPrompts: ReactionPrompt[];
  contributionPeriodStartsAt: string;
  contributionPeriodEndsAt: string;
  reactionPeriodStartsAt: string;
  reactionPeriodEndsAt: string;
  startsAt: string;
  endsAt: string;
}

export type PhotoEventWithMetadataResponse = Omit<
  PhotoEventResponse,
  "group"
> & {
  group: UserGroupResponse;
  photos: Pick<PhotoResponse, "imageUrl" | "thumbnails" | "id">[];
  photoCount: number;
};

/**
 * Photo
 */

export interface PhotoResponse extends BaseAPIDocument {
  imageUrl: string;
  locationData: PhotoLocationData;
  hasReacted?: boolean;
  annotationPrompts: AnnotationPrompt[];
  annotationAnswers: AnnotationAnswer[];
  reactionPrompts: ReactionPrompt[];
  createdBy: string;
  thumbnails: Thumbnail[];
}

export interface RandomPhotosResponse {
  photos: PhotoResponse[];
  remainingCount: number;
}

/**
 * Feed
 */
export interface ActiveFeedResponse {
  events: PhotoEventWithMetadataResponse[];
}

/**
 * PhotoReaction
 */
export interface PhotoReactionResponse extends BaseAPIDocument {
  answers: ReactionAnswer[];
  prompts: ReactionPrompt[];
  photo: string;
  createdBy: string;
}

export interface PhotoEventWalkResponse extends BaseAPIDocument {
  name: string;
  status: PhotoEventWalkStatus;
  event: string;
  distance: number;
  duration: number;
  createdBy: string;
  startedAt: string;
  endedAt: string;
}

export type PhotoEventWalkWithPhotosResponse = PhotoEventWalkResponse & {
  photos: PhotoResponse[];
};

export type PhotoEventWalkWithLocationDataResponse = PhotoEventWalkResponse & {
  locationData: LocationDataPointWithTimestamp[];
};
