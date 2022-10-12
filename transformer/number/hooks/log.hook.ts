import { AfterAllHook } from '../../../interface/hook.interface';

export class LogHook implements AfterAllHook {
  run(): void {
    console.log('Login hook...');
  }
}
