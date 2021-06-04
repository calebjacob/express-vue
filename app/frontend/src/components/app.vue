<template>
  <main-header />

  <div class="wrapper__content">
    <router-view />
  </div>

  <main-footer />

  <notifications />
</template>

<script lang="ts">
  import { defineComponent, provide } from 'vue';
  import { useSession, SessionModuleKey } from '@/modules/session';
  import MainFooter from '@/components/singles/main-footer.vue';
  import MainHeader from '@/components/singles/main-header.vue';
  import Notifications from '@/components/singles/notifications.vue';

  export default defineComponent({
    name: 'App',

    components: {
      MainFooter,
      MainHeader,
      Notifications
    },

    setup() {
      const session = useSession();
      session.load();
      provide(SessionModuleKey, session);
    }
  });
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
