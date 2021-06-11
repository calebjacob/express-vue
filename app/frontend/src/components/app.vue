<template>
  <the-header />

  <div class="wrapper__content">
    <router-view />
  </div>

  <the-footer />

  <the-notifications />
</template>

<script lang="ts">
  import { defineComponent, provide } from 'vue';
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
      // const SessionModuleKey: InjectionKey<SessionModule> = Symbol('SessionModule');
      // provide(SessionModuleKey, session);
    }
  });
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
