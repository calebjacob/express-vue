import { computed, ref } from 'vue';
import { ExampleModule } from './types';
import { useTheSession } from '@/modules/session';

export function useExample(): ExampleModule {
  const { session } = useTheSession();
  const message = ref('');

  const computedMessage = computed<string>(() => {
    return session.currentUser
      ? 'Hello signed in user! This is a computed message.'
      : 'Hello guest user! This is a computed message.';
  });

  return {
    computedMessage,
    message
  };
}
