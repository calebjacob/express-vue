<template>
  <div class="notifications">
    <div class="notifications__wrapper">
      <transition-group name="notification">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notifications__notification"
          :class="{
            'notifications__notification--error':
              notification.type === NotificationType.ERROR,
            'notifications__notification--success':
              notification.type === NotificationType.SUCCESS
          }"
        >
          <div class="notifications__content">
            <div class="layout layout--icon">
              <span
                class="icon fa"
                :class="{
                  'fa-exclamation-circle':
                    notification.type === NotificationType.ERROR,
                  'fa-info-circle':
                    notification.type === NotificationType.GENERIC,
                  'fa-check-circle':
                    notification.type === NotificationType.SUCCESS
                }"
              />

              <p>{{ notification.message }}</p>

              <button
                v-if="!notification.autoHide"
                type="button"
                class="button button--small button--transparent"
                @click="hideNotification(notification)"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useNotifications, NotificationType } from '@/modules/notifications';

  export default defineComponent({
    name: 'Notifications',

    setup() {
      const { hideNotification, notifications } = useNotifications();

      return {
        NotificationType,
        hideNotification,
        notifications
      };
    }
  });
</script>
