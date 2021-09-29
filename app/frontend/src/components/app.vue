<template>
  <TheHeader />

  <div class="wrapper__content">
    <RouterView />
  </div>

  <TheFooter />

  <TheNotifications />
</template>

<script lang="ts">
  import { defineComponent, provide } from 'vue';
  import { ExampleModuleKey, useExample } from '@/modules/example';
  import { useTheSession } from '@/modules/session';
  import TheFooter from '@/components/singles/the-footer.vue';
  import TheHeader from '@/components/singles/the-header.vue';
  import TheNotifications from '@/components/singles/the-notifications.vue';

  export default defineComponent({
    name: 'App',

    components: {
      TheFooter,
      TheHeader,
      TheNotifications
    },

    setup() {
      const session = useTheSession();
      session.load();

      const example = useExample();
      example.message.value = 'This is an example of using a provide/inject pattern.';
      provide(ExampleModuleKey, example);
    }
  });
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
