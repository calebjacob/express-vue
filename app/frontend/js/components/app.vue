<template>
  <main-header />

  <div class="wrapper__content">
    <router-view />
  </div>

  <main-footer />

  <notifications />
</template>

<script>
  import MainFooter from '@/components/singles/main-footer';
  import MainHeader from '@/components/singles/main-header';
  import Notifications from '@/components/singles/notifications';

  export default {
    name: 'App',

    components: {
      MainFooter,
      MainHeader,
      Notifications
    }
  };
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
