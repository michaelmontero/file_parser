import { Trackable } from '../interface/trackable';

export abstract class TimeTracker implements Trackable {
  time: number;

  startTimeTrack(): void {
    this.time = Date.now();
  }

  endTimeTrack(): void {
    console.log(`Took ${Date.now() - this.time}ms running`);
  }
}
