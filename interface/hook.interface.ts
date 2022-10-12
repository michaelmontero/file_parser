export interface Hook {
  run(): void;
}

export interface BeforeAllHook extends Hook {}
export interface AfterAllHook extends Hook {}
