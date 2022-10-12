"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class NumberTransform {
    transform(item) {
        console.log(`Working with ${JSON.stringify(item, null, 2)}`);
    }
}
class BeforeAll {
    run() {
        console.log('Running before all');
    }
}
class SendEmailHook {
    run() {
        console.log('Sending email to db hook');
    }
}
class LogHook {
    run() {
        console.log('Login hook...');
    }
}
const numberTransformable = new NumberTransform();
const beforeAllHook = new BeforeAll();
const logHook = new LogHook();
const sendEmailHook = new SendEmailHook();
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const csv_parse_1 = require("csv-parse");
class Main {
    startTimeTrack() {
        this.time = Date.now();
        console.log(`Started at ${new Date().toTimeString()}`);
    }
    run(url, { transform: { transform }, beforeAll, afterAll }) {
        this.startTimeTrack();
        const now = Date.now;
        beforeAll === null || beforeAll === void 0 ? void 0 : beforeAll.run();
        const parser = (0, csv_parse_1.parse)({ columns: true }, (_, records) => {
            records.forEach((data, index) => {
                try {
                    transform(data);
                }
                catch (e) {
                    console.log(`Unable to transform data at index ${index}`);
                }
            });
            afterAll === null || afterAll === void 0 ? void 0 : afterAll.forEach((hook) => hook.run());
            this.endTimeTrack();
        });
        fs_1.default.createReadStream(url).pipe(parser);
    }
    endTimeTrack() {
        console.log(`Took ${Date.now() - this.time}ms running`);
    }
}
new Main().run((0, path_1.join)(__dirname, '..', 'data.cvs'), {
    beforeAll: beforeAllHook,
    transform: numberTransformable,
    afterAll: [logHook, sendEmailHook],
});
//# sourceMappingURL=index.js.map