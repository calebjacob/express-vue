export interface StateModule<T> {
  reset(): void;
  state: Readonly<T>;
  update(value: Partial<T>): void;
}

export interface StateModuleOptions {
  save?: 'local' | 'session' | null;
}
