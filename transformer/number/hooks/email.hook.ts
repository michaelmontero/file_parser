import { AfterAllHook } from '../../../interface/hook.interface';

export class SendEmailHook implements AfterAllHook {
  run(): void {
    console.log('Sending email to db hook');
  }
}
