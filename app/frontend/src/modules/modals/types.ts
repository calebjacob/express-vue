import { ConfirmationModalOptions } from '@/components/shared/confirmation-modal.vue';

export interface ModalsModule {
  closeAllModals(): void;
  closeModal(name: string): void;
  modals: Readonly<Modals>;
  openConfirmationModal(options: ConfirmationModalOptions): void;
  openModal(name: string, data?: Record<string, any>): void;
}

export interface Modal {
  data?: Record<string, any>;
  id: string;
  isOpen: boolean;
  name: string;
}

export interface Modals {
  allModals: Modal[];
}
