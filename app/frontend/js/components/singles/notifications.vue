<template>
  <div class="notifications">
    <div class="notifications__wrapper">
      <transition-group name="notification">
        <div
          class="notifications__notification"
          :class="{
            'notifications__notification--error': notification.type === 'error',
            'notifications__notification--success':
              notification.type === 'success'
          }"
          v-for="notification in notifications"
          :key="notification.id"
          @click="hideNotification(notification)"
          @touchstart="hideNotification(notification)"
        >
          <div class="notifications__content">
            <div class="layout layout--icon">
              <span
                class="icon fa"
                :class="{
                  'fa-exclamation-circle': notification.type === 'error',
                  'fa-info-circle': notification.type === 'general',
                  'fa-check-circle': notification.type === 'success'
                }"
              ></span>
              <p>{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import useNotifications from '@/composables/notifications';

  export default {
    name: 'Notifications',

    setup() {
      const { hideNotification, notifications } = useNotifications();

      return {
        hideNotification,
        notifications
      };
    }
  };
</script>
