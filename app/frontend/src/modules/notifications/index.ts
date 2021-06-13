import { useNotifications } from './notifications';
import { NotificationsModule, NotificationType } from './types';

let notifications: NotificationsModule;

function useTheNotifications(): NotificationsModule {
  if (!notifications) {
    notifications = useNotifications();
  }

  return notifications;
}

export { useTheNotifications, NotificationsModule, NotificationType };
