import { PhotoEvent, PhotoEventWithMetadata } from "../types/models";

export function getEventActiveStatus(
  event: Omit<
    PhotoEvent | PhotoEventWithMetadata,
    | "contributionPeriodIsActive"
    | "reactionPeriodIsActive"
    | "isActive"
    | "group"
  >
) {
  const now = Date.now();
  let contributionPeriodIsActive = false;
  let reactionPeriodIsActive = false;
  let isActive = false;

  if (
    event.contributionPeriodStartsAt.valueOf() < now &&
    event.contributionPeriodEndsAt.valueOf() > now
  ) {
    contributionPeriodIsActive = true;
    isActive = true;
  }
  if (
    event.reactionPeriodStartsAt.valueOf() < now &&
    event.reactionPeriodEndsAt.valueOf() > now
  ) {
    reactionPeriodIsActive = true;
    isActive = true;
  }

  return {
    contributionPeriodIsActive,
    reactionPeriodIsActive,
    isActive,
  };
}
