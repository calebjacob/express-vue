<template>
  <Teleport to="#modals">
    <Transition name="modal">
      <div
        v-if="modal && modal.isOpen"
        ref="modalElement"
        v-entrap-focus
        class="modal"
        :class="{
          'modal--hide': !isVisible
        }"
      >
        <div class="modal__backdrop" @click="close" />

        <div class="modal__wrapper">
          <div class="modal__content">
            <slot :close="close" :modal-data="modal.data || {} as any" />
          </div>

          <button type="button" class="modal__close icon fa-times" title="Close" @click="close" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { useTheModals } from '@/modules/modals';

  const props = withDefaults(
    defineProps<{
      name: string;
    }>(),
    {}
  );

  const { closeModal, modals } = useTheModals();

  const modalElement = ref<HTMLDivElement | null>();

  const modal = computed(() => {
    return modals.allModals.find((m) => {
      return m.name === props.name;
    });
  });

  const isVisible = computed(() => {
    const firstOpenModal = modals.allModals.find((m) => {
      return m.isOpen;
    });
    return !!firstOpenModal && firstOpenModal.name === props.name;
  });

  watch(
    () => modalElement.value,
    (value) => {
      if (value) {
        initializeModal();
      } else {
        destroyModal();
      }
    }
  );

  function close() {
    if (modal.value) {
      closeModal(modal.value.name);
    }
  }

  function closeOnEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close();
    }
  }

  function destroyModal() {
    document.removeEventListener('keyup', closeOnEscapeKey);
  }

  function initializeModal() {
    document.addEventListener('keyup', closeOnEscapeKey);
  }
</script>
