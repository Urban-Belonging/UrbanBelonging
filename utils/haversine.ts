interface Coordinates {
  latitude: number;
  longitude: number;
}

export function haversineDistance(
  pointA: Coordinates,
  pointB: Coordinates
): number {
  const radius = 6371; // km

  const deltaLatitude = ((pointB.latitude - pointA.latitude) * Math.PI) / 180;
  const deltaLongitude =
    ((pointB.longitude - pointA.longitude) * Math.PI) / 180;

  const halfChordLength =
    Math.cos((pointA.latitude * Math.PI) / 180) *
      Math.cos((pointB.latitude * Math.PI) / 180) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2) +
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2);

  const angularDistance =
    2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));

  return radius * angularDistance;
}
