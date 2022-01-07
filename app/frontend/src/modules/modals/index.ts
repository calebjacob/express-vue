import { useModals } from './modals';
import { ModalsModule } from './types';

let modals: ModalsModule;

function useTheModals(): ModalsModule {
  if (!modals) {
    modals = useModals();
  }

  return modals;
}

export { useTheModals };
