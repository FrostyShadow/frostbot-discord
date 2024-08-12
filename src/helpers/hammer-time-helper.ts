export function getHammertime(timestamp: number, format: hammertimeType) {
  return `<t:${Math.floor(timestamp / 1000)}:${format}>`;
}

export enum hammertimeType {
  date = "d",
  fullMonth = "D",
  time = "t",
  fullTime = "T",
  dateTime = "f",
  fullDateTime = "F",
  relativeTime = "R",
}
