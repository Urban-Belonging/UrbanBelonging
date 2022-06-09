import { PhotoLocationData } from "../../../types/models";
import { AnnotationAnswer, ReactionAnswer } from "../../prompts";
import { HTTP } from "../http";
import {
  parsePhotoEventResponse,
  parsePhotoReactionResponse,
  parsePhotoResponse,
} from "../parseResponse";
import {
  PaginationResponse,
  PhotoEventResponse,
  PhotoReactionResponse,
  PhotoResponse,
  RandomPhotosResponse,
} from "../types";

export class PhotosAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async listForEvent(eventId: string, skip: number, limit: number) {
    const response = await this.http.get<PaginationResponse<PhotoResponse>>(
      `v1/photo-event/${eventId}/photos`,
      {
        params: {
          skip,
          limit,
        },
      }
    );

    return {
      ...response,
      result: response.result.map((photo) => parsePhotoResponse(photo)),
    };
  }

  async listForWalk(eventId: string, start: Date, end: Date) {
    const response = await this.http.get<PhotoResponse[]>(
      `v1/photo-event/${eventId}/walk/photos`,
      { params: { start: start.toISOString(), end: end.toISOString() } }
    );

    return response.map((photo) => parsePhotoResponse(photo));
  }

  async randomListForEvent(eventId: string) {
    const response = await this.http.get<RandomPhotosResponse>(
      `v1/photo-event/${eventId}/random-photos`
    );
    return {
      ...response,
      photos: response.photos.map((photo) => parsePhotoResponse(photo)),
    };
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

  async uploadToEvent(eventId: string, uri: string) {
    const formData = new FormData();
    formData.append("photo", {
      // @ts-ignore
      uri,
      name: getFilenameFromUri(uri),
      type: getMimeTypeFromUri(uri),
    });
    const response = await this.http.post<PhotoResponse>(
      `v1/photo-event/${eventId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      }
    );

    return parsePhotoResponse(response);
  }

  async createReaction(
    id: string,
    params: {
      answers: ReactionAnswer[];
    }
  ) {
    const response = await this.http.post<PhotoReactionResponse>(
      `v1/photo/${id}/reaction`,
      params
    );

    return parsePhotoReactionResponse(response);
  }

  async getReactions(id: string) {
    const response = await this.http.get<PhotoReactionResponse[]>(
      `v1/photo/${id}/reactions`
    );

    return response.map(parsePhotoReactionResponse);
  }

  async annotate(
    id: string,
    params: { annotationAnswers: AnnotationAnswer[] }
  ) {
    const response = await this.http.post<PhotoResponse>(
      `v1/photo/${id}/annotate`,
      params
    );

    return parsePhotoResponse(response);
  }

  async updateMetadata(
    id: string,
    params: { exifData: any; locationData: PhotoLocationData }
  ) {
    const response = await this.http.put<PhotoResponse>(
      `v1/photo/${id}/metadata`,
      params
    );

    return parsePhotoResponse(response);
  }
}

function getMimeTypeFromUri(uri: string) {
  if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) return "image/jpeg";
  return "image/[ng";
}

function getFilenameFromUri(uri: string) {
  const matches = uri.match(/[^/]*$/);
  if (matches) return matches[0];
  throw new Error("Could not determine filename from uri");
}
