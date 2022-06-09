import { AuthAPI } from "./resources/AuthAPI";
import { HTTP } from "./http";
import { PhotoEventsAPI } from "./resources/PhotoEventsAPI";
import { PhotosAPI } from "./resources/PhotosAPI";
import { UserGroupsAPI } from "./resources/UserGroupsAPI";
import { FeedAPI } from "./resources/FeedAPI";
import { PhotoEventWalksAPI } from "./resources/PhotoEventWalksAPI";

export class API {
  private http: HTTP;
  public auth: AuthAPI;
  public userGroups: UserGroupsAPI;
  public photoEvents: PhotoEventsAPI;
  public photoEventWalks: PhotoEventWalksAPI;
  public photos: PhotosAPI;
  public feed: FeedAPI;

  constructor() {
    this.http = new HTTP(async () => {
      await this.auth.refresh();
    });
    this.auth = new AuthAPI(this.http);
    this.userGroups = new UserGroupsAPI(this.http);
    this.photoEvents = new PhotoEventsAPI(this.http);
    this.photoEventWalks = new PhotoEventWalksAPI(this.http);
    this.photos = new PhotosAPI(this.http);
    this.feed = new FeedAPI(this.http);
  }
}
