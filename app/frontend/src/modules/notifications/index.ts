import { useNotifications } from './notifications';
import { NotificationsModule, NotificationType } from './types';

const module = useNotifications();

function useTheNotifications(): NotificationsModule {
  return module;
}

export { useTheNotifications, NotificationType };
