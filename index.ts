import fs from "fs";
import { parse } from "csv-parse";
import { BeforeAll } from "./hooks/before-all.hook";
import { LogHook } from "./hooks/log.hook";
import { SendEmailHook } from "./hooks/email.hook";
import { NumberTransform } from "./transformer/number/number.transformer";
import { TimeTracker } from "./helper/time-tracker.helper";
import { Params } from "./types/params";
import { FileLocation } from "./enum/file-location.enum";
import https from "https";

const numberTransformable = new NumberTransform();
const logHook = new LogHook();
const beforeAllHook = new BeforeAll();
const sendEmailHook = new SendEmailHook();

type Url = {
  url: string;
  location: FileLocation;
};

class Main extends TimeTracker {
  readFile({ url, location }: Url, parser: any) {
    try {
      if (location === FileLocation.LOCAL)
        return fs.createReadStream(url).pipe(parser);
      else if (location === FileLocation.REMOTE)
        return https.get(url, (cvs) => cvs.pipe(parser));

      throw new Error("Unknown file location");
    } catch (e) {
      console.error("Error reading file", e);
    }
  }

  run(url: Url, { transform: { transform }, beforeAll, afterAll }: Params) {
    this.startTimeTrack();
    beforeAll?.run();

    const parser = parse({ columns: true }, (_, records) => {
      records.forEach((data, index) => {
        try {
          transform(data);
        } catch (e) {
          console.log(`Unable to transform data at index ${index}`);
        }
      });
      afterAll?.forEach(({ run }) => run());
      this.endTimeTrack();
    });

    this.readFile(url, parser);
  }
}

new Main().run(
  {
    url: "https://raw.githubusercontent.com/michaelmontero/gd_michael/main/data.csv",
    location: FileLocation.REMOTE,
  },
  {
    beforeAll: beforeAllHook,
    transform: numberTransformable,
    afterAll: [logHook, sendEmailHook],
  }
);

// new Main().run(
//   {
//     url: join(__dirname, '..', 'data.csv'),
//     location: FileLocation.LOCAL,
//   },
//   {
//     beforeAll: beforeAllHook,
//     transform: numberTransformable,
//     afterAll: [logHook, sendEmailHook],
//   }
// );
