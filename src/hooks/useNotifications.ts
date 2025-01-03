import { useState, useEffect } from 'react';
import { 
  requestNotificationPermission, 
  registerServiceWorker,
  subscribeToPushNotifications 
} from '../utils/notifications';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    const init = async () => {
      // Check current permission
      setPermission(Notification.permission);

      // Register service worker
      const reg = await registerServiceWorker();
      if (reg) {
        setRegistration(reg);
        
        // Check existing subscription
        const existingSub = await reg.pushManager.getSubscription();
        if (existingSub) {
          setSubscription(existingSub);
        }
      }
    };

    init();
  }, []);

  const requestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPermission('granted');
      
      // Subscribe to push notifications if we have a registration
      if (registration) {
        const sub = await subscribeToPushNotifications(registration);
        if (sub) {
          setSubscription(sub);
        }
      }
    }
    return granted;
  };

  return {
    permission,
    subscription,
    requestPermission
  };
}