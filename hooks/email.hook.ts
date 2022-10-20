import { AfterAllHook } from "../interface/hook.interface";

export class SendEmailHook implements AfterAllHook {
  run(): void {
    console.log('After all send email notification...');
  }
}
