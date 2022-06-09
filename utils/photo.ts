import { Thumbnail } from "../types/models";

export function getBestSizeThumbnailForPhoto<
  T extends { thumbnails: Thumbnail[] }
>(photo: T, targetWidth: number) {
  return photo.thumbnails.reduce<Thumbnail | null>((acc, thumbnail) => {
    if (!acc) return thumbnail;

    return Math.abs(acc.size - targetWidth) <
      Math.abs(thumbnail.size - targetWidth)
      ? acc
      : thumbnail;
  }, null);
}
