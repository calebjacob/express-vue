<template>
  <main-header />

  <div class="wrapper__content">
    <router-view />
  </div>

  <main-footer />

  <notifications />
</template>

<script>
  import mainFooterComponent from '@/components/singles/main-footer';
  import mainHeaderComponent from '@/components/singles/main-header';
  import notificationsComponent from '@/components/singles/notifications';

  export default {
    name: 'App',

    components: {
      mainFooter: mainFooterComponent,
      mainHeader: mainHeaderComponent,
      notifications: notificationsComponent
    }
  };
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
