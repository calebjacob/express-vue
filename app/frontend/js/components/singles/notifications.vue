<template>
  <div class="notifications">
    <div class="notifications__wrapper">
      <div
        class="notifications__notification"
        :class="{
          'notifications__notification--error': notification.type === 'error',
          'notifications__notification--success':
            notification.type === 'success'
        }"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <p>{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import useNotifications from '@/composables/notifications';

  export default {
    name: 'TheNotifications',

    setup() {
      const { notifications } = useNotifications();

      return {
        notifications
      };
    }
  };
</script>
