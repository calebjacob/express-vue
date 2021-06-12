import { Ref } from 'vue';

export interface NotificationsModule {
  closeAllErrorNotifications(): void;
  hideNotification(notification: Notification): void;
  notifications: Ref<readonly Notification[]>;
  showNotification(options: ShowNotificationOptions): void;
}

export interface Notification {
  autoHide: boolean;
  id: string;
  message: string;
  type: NotificationType;
}

export interface ShowNotificationOptions {
  autoHide?: boolean;
  message: string;
  type: NotificationType;
}

export enum NotificationType {
  ERROR = 'ERROR',
  GENERIC = 'GENERIC',
  SUCCESS = 'SUCCESS'
}
