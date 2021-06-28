import { mocked } from 'ts-jest/utils';
import { useStore } from '@/modules/store';
import { StoreModule } from '@/modules/store/types';
import { when } from 'jest-when';

jest.mock('@/modules/store');
const useStoreMock = mocked(useStore, true);

export interface StoreModuleMock<T> {
  reset: jest.Mock;
  state: T;
  update: jest.Mock;
}

export function mockStore<T extends object>(name: string, state: T): StoreModuleMock<T> {
  const mockedStore: StoreModuleMock<T> = {
    reset: jest.fn(),
    state,
    update: jest.fn()
  };

  when(useStoreMock)
    .calledWith(name, expect.any(Object))
    .mockReturnValue(mockedStore as StoreModule<T>);

  when(useStoreMock)
    .calledWith(name, expect.any(Object), expect.any(Object))
    .mockReturnValue(mockedStore as StoreModule<T>);

  return mockedStore;
}
