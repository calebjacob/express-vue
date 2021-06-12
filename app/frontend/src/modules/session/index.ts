import { useSession } from './session';
import { SessionModule } from './types';

const session = useSession();

function useTheSession(): SessionModule {
  return session;
}

export { useTheSession };
