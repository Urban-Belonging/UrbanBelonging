import { haversineDistance } from "./haversine";

interface LocationData {
  latitude: number;
  longitude: number;
}

export function calculateWalkDistanceAndDuration(
  startedAt: Date,
  endedAt: Date,
  locationData: LocationData[]
) {
  return {
    duration: endedAt.valueOf() - startedAt.valueOf(),
    distance: locationData.reduce((result, currentPoint, index) => {
      const nextPoint = locationData[index + 1];

      if (nextPoint) {
        result += haversineDistance(currentPoint, nextPoint);
      }

      return result;
    }, 0),
  };
}

export function formatDuration(duration: number) {
  return `${Math.floor(duration / 60000) || 1} min`;
}

export function formatDistance(distance: number) {
  return `${distance.toFixed(1)} km`;
}
