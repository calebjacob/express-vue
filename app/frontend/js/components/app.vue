<template>
  <router-view />
  <notifications />
</template>

<script>
  import notificationsComponent from '@/components/singles/notifications';

  export default {
    name: 'App',

    components: {
      notifications: notificationsComponent
    }
  };
</script>

<style lang="sass">
  @import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
  @import '../../styles/main'
</style>
