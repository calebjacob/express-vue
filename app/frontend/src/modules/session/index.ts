import { useSession } from './session';
import { SessionModule } from './types';

const module = useSession();

function useTheSession(): SessionModule {
  return module;
}

export { useTheSession };
