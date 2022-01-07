import { ConfirmationModalOptions } from '@/components/shared/confirmation-modal.vue';
import { v4 as uuid } from 'uuid';
import { ModalsModule, Modal, Modals } from './types';
import { useStore } from '@/modules/store';

export function useModals(): ModalsModule {
  const store = useStore<Modals>('Modals', {
    allModals: []
  });

  function closeAllModals(): void {
    const allModals = store.state.allModals.map((m) => {
      return {
        ...m,
        isOpen: false
      };
    });

    store.update({
      allModals
    });
  }

  function closeModal(name: string) {
    const allModals = store.state.allModals.map((m) => {
      return {
        ...m,
        isOpen: m.name === name ? false : m.isOpen
      };
    });

    store.update({
      allModals
    });
  }

  function openConfirmationModal(options: ConfirmationModalOptions) {
    openModal('confirmation', options);
  }

  function openModal(name: string, data?: Record<string, any>) {
    const existingModal = store.state.allModals.find((m) => {
      return m.name === name;
    });

    if (existingModal) {
      const modal = {
        ...existingModal,
        data,
        isOpen: true
      };

      const allModals = store.state.allModals.filter((m) => {
        return m.name !== modal.name;
      });

      store.update({
        allModals: [modal, ...allModals]
      });
    } else {
      const modal: Modal = {
        data,
        id: uuid(),
        isOpen: true,
        name
      };

      const allModals = [modal, ...store.state.allModals];

      store.update({
        allModals
      });
    }
  }

  return {
    closeAllModals,
    closeModal,
    modals: store.state,
    openConfirmationModal,
    openModal
  };
}
