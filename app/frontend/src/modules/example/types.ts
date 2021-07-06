import { ComputedRef, InjectionKey, Ref } from 'vue';

export interface ExampleModule {
  computedMessage: ComputedRef<string>;
  message: Ref<string>;
}

export const ExampleModuleKey: InjectionKey<ExampleModule> = Symbol('ExampleModule');
