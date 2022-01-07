<template>
  <Modal v-slot="{ modalData }: { modalData: ConfirmationModalOptions }" name="confirmation">
    <section class="section center">
      <span v-if="modalData.iconClass" class="icon icon--block icon--large" :class="modalData.iconClass"></span>

      <h2 class="title title--2">{{ modalData.title }}</h2>

      <p v-if="modalData.description" class="bigger">{{ modalData.description }}</p>

      <hr />

      <div class="layout layout--hz layout--hz-equal">
        <button type="button" class="button button--border" @click="cancel">Never Mind</button>
        <button
          type="button"
          class="button"
          :class="[modalData.confirmButtonClass, isProcessing ? 'button--loading' : '']"
          @click="confirm(modalData)"
        >
          {{ modalData.confirmButtonText ? modalData.confirmButtonText : 'Yes, Continue' }}
        </button>
      </div>
    </section>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Modal from './modal.vue';
  import { useErrors } from '@/modules/errors';
  import { useTheModals } from '@/modules/modals';

  export interface ConfirmationModalOptions {
    confirmButtonClass?: string;
    confirmButtonText?: string;
    description?: string;
    iconClass?: string;
    onConfirm(): Promise<any> | any;
    onConfirmSuccess?(result: any): Promise<any> | any;
    title: string;
  }

  const { handleError } = useErrors();
  const { closeModal } = useTheModals();

  const isProcessing = ref(false);

  function cancel() {
    closeModal('confirmation');
  }

  async function confirm({ onConfirm, onConfirmSuccess }: ConfirmationModalOptions): Promise<void> {
    try {
      isProcessing.value = true;

      const result = await onConfirm();

      if (onConfirmSuccess) {
        await onConfirmSuccess(result);
      }

      closeModal('confirmation');
    } catch (error) {
      handleError(error);
    } finally {
      isProcessing.value = false;
    }
  }
</script>
