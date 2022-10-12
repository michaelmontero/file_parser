export interface Trackable {
  time: number;
  startTimeTrack(): void;
  endTimeTrack(): void;
}
