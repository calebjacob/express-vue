import { useSession } from './session';
import { SessionModule } from './types';

let session: SessionModule;

function useTheSession(): SessionModule {
  if (!session) {
    session = useSession();
  }

  return session;
}

export { useTheSession };
