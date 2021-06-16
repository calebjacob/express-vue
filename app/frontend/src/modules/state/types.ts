export interface StateModule<T> {
  reset(): void;
  state: Readonly<T>;
  update(value: Partial<T>): void;
}
