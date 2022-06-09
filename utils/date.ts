export function formatDate(date: Date) {
  const dateString = date.toDateString();
  const timeString = date.toTimeString();
  return `${dateString.substr(3)} ${timeString.substr(0, 5)}`;
}
