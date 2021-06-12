import { InjectionKey, Ref } from 'vue';

export interface ExampleModule {
  message: Ref<string>;
}

export const ExampleModuleKey: InjectionKey<ExampleModule> = Symbol('ExampleModule');
