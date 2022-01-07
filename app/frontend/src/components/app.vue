<template>
  <TheHeader />

  <div class="wrapper__content">
    <RouterView v-if="state.hasInitialized" />
  </div>

  <TheModals />
  <TheFooter />
  <TheNotifications />
  <ConfirmationModal />
</template>

<script lang="ts" setup>
  import { provide, reactive } from 'vue';
  import { ExampleModuleKey, useExample } from '@/modules/example';
  import { useTheSession } from '@/modules/session';
  import TheModals from './singles/the-modals.vue';
  import TheNotifications from './singles/the-notifications.vue';
  import TheFooter from './singles/the-footer.vue';
  import TheHeader from './singles/the-header.vue';
  import ConfirmationModal from './shared/confirmation-modal.vue';

  const state = reactive({
    hasInitialized: false
  });

  const session = useTheSession();

  const example = useExample();
  example.message.value = 'This is an example of using a provide/inject pattern.';
  provide(ExampleModuleKey, example);

  async function initialize() {
    calculateAppHeight();
    window.addEventListener('resize', calculateAppHeight);

    await session.load();

    state.hasInitialized = true;
  }

  function calculateAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }

  initialize();
</script>

<style lang="sass">
  @import '../../styles/font-awesome.css'
  @import '../../styles/index'
</style>
