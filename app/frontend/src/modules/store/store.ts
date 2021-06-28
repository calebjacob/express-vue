import { StoreModule, StoreModuleOptions } from './types';
import { reactive, readonly } from 'vue';
import logger from '@/services/logger';

export function useStore<T extends object>(
  name: string,
  defaultValue: T,
  options: StoreModuleOptions = {}
): StoreModule<T> {
  const state = reactive({
    ...defaultValue
  }) as T;
  const readonlyState = readonly(state) as T;
  const storageKey = `StateStorage:${name}`;

  function readSavedData() {
    if (!options.save) {
      return;
    }

    let data: string | null = null;

    if (options.save === 'local') {
      data = localStorage.getItem(storageKey);
    } else if (options.save === 'session') {
      data = sessionStorage.getItem(storageKey);
    }

    if (data) {
      const storedValue = JSON.parse(data);
      Object.assign(state, storedValue);
      logger.info(`💾 STORE RESTORED: ${name}`, storedValue);
    }
  }

  function reset() {
    Object.assign(state, defaultValue);
    logger.info(`🗑 STORE RESET: ${name}`, defaultValue);
    resetSavedData();
  }

  function resetSavedData() {
    if (options.save === 'local') {
      localStorage.removeItem(storageKey);
    } else if (options.save === 'session') {
      sessionStorage.removeItem(storageKey);
    }
  }

  function update(newValue: Partial<T>) {
    Object.assign(state, newValue);
    logger.info(`📝 STORE MUTATION: ${name}`, newValue);
    updateSavedData();
  }

  function updateSavedData() {
    if (!options.save) {
      return;
    }

    const data = JSON.stringify(state);

    if (options.save === 'local') {
      localStorage.setItem(storageKey, data);
    } else if (options.save === 'session') {
      sessionStorage.setItem(storageKey, data);
    }
  }

  readSavedData();

  return {
    reset,
    state: readonlyState,
    update
  };
}
