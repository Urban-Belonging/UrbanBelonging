import * as Location from "expo-location";

export class LocationTracking {
  static _instance: LocationTracking;
  public eventId: string | null = null;
  public walkStartedAt: Date | null = null;
  public trackingData: Location.LocationObject[] = [];

  constructor() {
    // Ensure it's a singleton
    if (LocationTracking._instance) return LocationTracking._instance;
    LocationTracking._instance = this;
  }

  startUpdates(eventId: string) {
    this.eventId = eventId;
    this.walkStartedAt = new Date();
    this.trackingData = [];
  }

  stopUpdates() {
    return {
      trackingData: this.trackingData,
      walkStartedAt: this.walkStartedAt,
    };
  }

  getLatestLocation() {
    return this.trackingData[this.trackingData.length - 1];
  }

  getTrackingData() {
    return this.trackingData;
  }

  onLocationUpdate(locations: Location.LocationObject[]) {
    this.trackingData = [...this.trackingData, ...locations];
  }
}
