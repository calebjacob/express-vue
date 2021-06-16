import { StateModule } from './types';
import { reactive, readonly } from 'vue';

export function useState<T extends object>(name: string, defaultValue: T): StateModule<T> {
  const state = reactive(defaultValue) as T;
  const readonlyState = readonly(state) as T;

  function reset() {
    Object.assign(state, defaultValue);
    console.log(`🗑 [STATE RESET] - ${name}:`, defaultValue);
  }

  function update(newValue: Partial<T>) {
    Object.assign(state, newValue);
    console.log(`📝 [STATE MUTATION] - ${name}:`, newValue);
  }

  return {
    reset,
    state: readonlyState,
    update
  };
}
