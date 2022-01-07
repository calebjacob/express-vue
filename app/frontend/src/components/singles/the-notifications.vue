<template>
  <div class="notifications">
    <div class="notifications__wrapper">
      <TransitionGroup name="notification">
        <div
          v-for="notification in notifications.allNotifications"
          :key="notification.id"
          class="notifications__notification"
          :class="{
            'notifications__notification--error': notification.type === 'ERROR',
            'notifications__notification--success': notification.type === 'SUCCESS'
          }"
        >
          <div class="notifications__content">
            <div class="layout layout--icon">
              <span
                class="icon"
                :class="{
                  'fa-exclamation-circle': notification.type === 'ERROR',
                  'fa-info-circle': notification.type === 'GENERIC',
                  'fa-check-circle': notification.type === 'SUCCESS'
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
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useTheNotifications } from '@/modules/notifications';

  const { hideNotification, notifications } = useTheNotifications();
</script>
