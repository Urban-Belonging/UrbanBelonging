import { HTTP } from "../http";
import { parsePhotoEventWithMetadataResponse } from "../parseResponse";
import type { ActiveFeedResponse } from "../types";

export class FeedAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async getSuggestedEvents() {
    const response = await this.http.get<ActiveFeedResponse>("v1/feed");

    return response.events.map((event) =>
      parsePhotoEventWithMetadataResponse(event)
    );
  }
}
