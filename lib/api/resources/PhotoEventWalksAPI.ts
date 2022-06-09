import {
  LocationDataPointWithTimestamp,
  PhotoEventWalkWithLocationData,
  PhotoEventWalkWithPhotos,
} from "../../../types/models";
import { HTTP } from "../http";
import {
  parsePhotoEventWalkResponse,
  parsePhotoEventWalkWithLocationDataResponse,
  parsePhotoResponse,
} from "../parseResponse";
import type {
  PhotoEventWalkResponse,
  PhotoEventWalkWithLocationDataResponse,
  PhotoEventWalkWithPhotosResponse,
} from "../types";

export class PhotoEventWalksAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async create(
    eventId: string,
    params: {
      locationData: LocationDataPointWithTimestamp<number>[];
      startedAt: Date;
      endedAt: Date;
      distance: number;
      duration: number;
    }
  ) {
    const response = await this.http.post<PhotoEventWalkResponse>(
      `v1/photo-event/${eventId}/walk`,
      params,
      {
        timeout: 60000,
      }
    );
    return parsePhotoEventWalkResponse(response);
  }

  async list(eventId: string): Promise<PhotoEventWalkWithPhotos[]> {
    const response = await this.http.get<PhotoEventWalkWithPhotosResponse[]>(
      `v1/photo-event/${eventId}/walks`
    );
    return response.map((walk) => ({
      ...parsePhotoEventWalkResponse(walk),
      photos: walk.photos.map((photo) => parsePhotoResponse(photo)),
    }));
  }

  async get(id: string): Promise<PhotoEventWalkWithLocationData> {
    const response =
      await this.http.get<PhotoEventWalkWithLocationDataResponse>(
        `v1/photo-event-walk/${id}`
      );
    return parsePhotoEventWalkWithLocationDataResponse(response);
  }
}
