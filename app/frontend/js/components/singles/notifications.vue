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
        <div class="notifications__content">
          <p>{{ notification.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import useNotifications from '@/composables/notifications';

  export default {
    name: 'Notifications',

    setup() {
      const { notifications } = useNotifications();

      return {
        notifications
      };
    }
  };
</script>
