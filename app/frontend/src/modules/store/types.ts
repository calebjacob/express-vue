export interface StoreModule<T> {
  reset(): void;
  state: Readonly<T>;
  update(value: Partial<T>): void;
}

export interface StoreModuleOptions {
  save?: 'local' | 'session' | null;
}
