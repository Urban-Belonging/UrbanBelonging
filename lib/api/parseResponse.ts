import {
  BaseDocument,
  Photo,
  PhotoEvent,
  PhotoEventWalk,
  PhotoEventWalkWithLocationData,
  PhotoEventWithMetadata,
  PhotoReaction,
  User,
  UserGroup,
  UserGroupMember,
} from "../../types/models";
import { getEventActiveStatus } from "../../utils/photo-event";
import {
  BaseAPIDocument,
  PhotoEventResponse,
  PhotoEventWalkResponse,
  PhotoEventWalkWithLocationDataResponse,
  PhotoEventWithMetadataResponse,
  PhotoReactionResponse,
  PhotoResponse,
  UserGroupMemberResponse,
  UserGroupResponse,
  UserResponse,
} from "./types";

function parseBaseDocument<T extends BaseAPIDocument>(
  response: T
): T & BaseDocument {
  return {
    ...response,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function parseUserResponse(response: UserResponse): User {
  return { ...response, ...parseBaseDocument(response) };
}

export function parseUserGroupResponse(response: UserGroupResponse): UserGroup {
  return {
    ...response,
    ...parseBaseDocument(response),
  };
}

export function parseUserGroupMemberResponse(
  response: UserGroupMemberResponse
): UserGroupMember {
  return {
    ...response,
  };
}

export function parsePhotoEventResponse(
  response: PhotoEventResponse
): PhotoEvent {
  const parsedEvent = {
    ...response,
    ...parseBaseDocument(response),
    ...parsePhotoEventDates(response),
  };

  return {
    ...parsedEvent,
    ...getEventActiveStatus(parsedEvent),
  };
}

export function parsePhotoEventWithMetadataResponse(
  response: PhotoEventWithMetadataResponse
): PhotoEventWithMetadata {
  const parsedEvent = {
    ...response,
    ...parseBaseDocument(response),
    ...parsePhotoEventDates(response),
  };

  return {
    ...parsedEvent,
    ...getEventActiveStatus(parsedEvent),
    group: parseUserGroupResponse(response.group),
  };
}

export function parsePhotoResponse(response: PhotoResponse): Photo {
  return {
    ...response,
    ...parseBaseDocument(response),
    thumbnails: response.thumbnails || [],
  };
}

export function parsePhotoReactionResponse(
  response: PhotoReactionResponse
): PhotoReaction {
  return {
    ...response,
    ...parseBaseDocument(response),
  };
}

export function parsePhotoEventWalkResponse(
  response: PhotoEventWalkResponse | PhotoEventWalkWithLocationDataResponse
): PhotoEventWalk {
  return {
    ...response,
    ...parseBaseDocument(response),
    startedAt: new Date(response.startedAt),
    endedAt: new Date(response.endedAt),
  };
}

export function parsePhotoEventWalkWithLocationDataResponse(
  response: PhotoEventWalkWithLocationDataResponse
): PhotoEventWalkWithLocationData {
  return {
    ...response,
    ...parsePhotoEventWalkResponse(response),
  };
}

function parsePhotoEventDates(
  response: PhotoEventResponse | PhotoEventWithMetadataResponse
) {
  return {
    contributionPeriodStartsAt: new Date(response.contributionPeriodStartsAt),
    contributionPeriodEndsAt: new Date(response.contributionPeriodEndsAt),
    reactionPeriodStartsAt: new Date(response.reactionPeriodStartsAt),
    reactionPeriodEndsAt: new Date(response.reactionPeriodEndsAt),
    startsAt: new Date(response.startsAt),
    endsAt: new Date(response.endsAt),
  };
}
