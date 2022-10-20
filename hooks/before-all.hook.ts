import { BeforeAllHook } from "../interface/hook.interface";

export class BeforeAll implements BeforeAllHook {
  run(): void {
    console.log('Before all hook');
  }
}
