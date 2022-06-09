import {
  LocationDataPointWithTimestamp,
  PhotoEventWalkWithPhotos,
} from "../../../types/models";
import { HTTP } from "../http";
import {
  parsePhotoEventResponse,
  parsePhotoEventWalkResponse,
  parsePhotoEventWithMetadataResponse,
  parsePhotoResponse,
} from "../parseResponse";
import type {
  PhotoEventResponse,
  PhotoEventWalkResponse,
  PhotoEventWalkWithPhotosResponse,
  PhotoEventWithMetadataResponse,
} from "../types";

export class PhotoEventsAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async listForGroup(groupId: string) {
    const response = await this.http.get<PhotoEventResponse[]>(
      "v1/photo-event",
      {
        params: {
          group: groupId,
        },
      }
    );
    return response.map((photoEvent) => parsePhotoEventResponse(photoEvent));
  }

  async create(params: {
    group: string;
    name: string;
    contributionPeriodStartsAt: Date;
    contributionPeriodEndsAt: Date;
    reactionPeriodStartsAt: Date;
    reactionPeriodEndsAt: Date;
  }) {
    const response = await this.http.post<PhotoEventResponse>(
      "v1/photo-event",
      params
    );
    return parsePhotoEventResponse(response);
  }

  async get(id: string) {
    const response = await this.http.get<PhotoEventWithMetadataResponse>(
      `v1/photo-event/${id}`
    );
    return parsePhotoEventWithMetadataResponse(response);
  }
}
