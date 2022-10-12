import fs from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse';
import { BeforeAll } from './transformer/number/hooks/before-all.hook';
import { LogHook } from './transformer/number/hooks/log.hook';
import { SendEmailHook } from './transformer/number/hooks/email.hook';
import { NumberTransform } from './transformer/number/number.transformer';
import { TimeTracker } from './helper/trackable';
import { Params } from './types/params';

const numberTransformable = new NumberTransform();
const logHook = new LogHook();
const beforeAllHook = new BeforeAll();
const sendEmailHook = new SendEmailHook();

class Main extends TimeTracker {
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
}

new Main().run(join(__dirname, '..', 'data.cvs'), {
  beforeAll: beforeAllHook,
  transform: numberTransformable,
  afterAll: [logHook, sendEmailHook],
});
