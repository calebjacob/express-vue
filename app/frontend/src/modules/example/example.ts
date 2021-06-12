import { ref } from 'vue';
import { ExampleModule } from './types';

export function useExample(): ExampleModule {
  const message = ref('');

  return {
    message
  };
}
