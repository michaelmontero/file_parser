interface Hook {
  run(): void;
}

interface BeforeAllHook extends Hook {}
interface AfterAllHook extends Hook {}

interface Transformable {
  transform(item: any): void;
}

interface Trackable {
  time: number;
  startTimeTrack(): void;
  endTimeTrack(): void;
}

class NumberTransform implements Transformable {
  transform(item: any) {
    console.log(`Working with ${JSON.stringify(item, null, 2)}`);
  }
}

type Params = {
  transform: Transformable;
  beforeAll?: Hook;
  afterAll?: Hook[];
};

class BeforeAll implements BeforeAllHook {
  run(): void {
    console.log('Running before all');
  }
}

class SendEmailHook implements AfterAllHook {
  run(): void {
    console.log('Sending email to db hook');
  }
}

class LogHook implements AfterAllHook {
  run(): void {
    console.log('Login hook...');
  }
}

const numberTransformable = new NumberTransform();
const beforeAllHook = new BeforeAll();

const logHook = new LogHook();
const sendEmailHook = new SendEmailHook();

import fs from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse';

class Main implements Trackable {
  time: number;

  startTimeTrack(): void {
    this.time = Date.now();
  }

  run(url: string, { transform: { transform }, beforeAll, afterAll }: Params) {
    this.startTimeTrack();
    const now = Date.now;
    beforeAll?.run();

    const parser = parse({ columns: true }, (_, records) => {
      records.forEach((data, index) => {
        try {
          transform(data);
        } catch (e) {
          console.log(`Unable to transform data at index ${index}`);
        }
      });

      afterAll?.forEach((hook) => hook.run());
      this.endTimeTrack();
    });

    fs.createReadStream(url).pipe(parser);
  }

  endTimeTrack(): void {
    console.log(`Took ${Date.now() - this.time}ms running`);
  }
}

new Main().run(join(__dirname, '..', 'data.cvs'), {
  beforeAll: beforeAllHook,
  transform: numberTransformable,
  afterAll: [logHook, sendEmailHook],
});
