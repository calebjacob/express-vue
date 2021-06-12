import { useNotifications } from './notifications';
import { NotificationsModule, NotificationType } from './types';

const notifications = useNotifications();

function useTheNotifications(): NotificationsModule {
  return notifications;
}

export { useTheNotifications, NotificationType };
