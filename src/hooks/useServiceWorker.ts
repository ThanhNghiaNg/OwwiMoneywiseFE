import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    let registration: ServiceWorkerRegistration | null = null;

    const registerPushNotificationSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          // Check for existing registration
          const existingRegistration = await navigator.serviceWorker.getRegistration('/push-noti-worker.js');
          if (existingRegistration) {
            console.debug('Service Worker already registered:', existingRegistration);

            // Check for updates to the SW script
            const update = await existingRegistration.update() as unknown as ServiceWorkerRegistration;
            console.debug('Service Worker update check completed:', update);

            // Listen for the new SW entering the 'waiting' state
            if (update.waiting) {
              console.debug('New Service Worker is waiting to activate:',update, update.waiting);
              // Optionally prompt the user to activate the new SW
              update.waiting.postMessage({ type: 'SKIP_WAITING' });
            }

            // Listen for the controller change (new SW takes control)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              console.debug('Service Worker controller changed, reloading page...');
              window.location.reload(); // Reload to ensure the new SW is fully active
            });

            registration = existingRegistration;
          } else {
            // Register the Service Worker if none exists
            registration = await navigator.serviceWorker.register('/push-noti-worker.js');
            console.debug('Service Worker registered successfully:', registration);
          }

          // Subscribe to push notifications
          const subscription = await registration.pushManager.subscribe({
            applicationServerKey: 'BLXxVs9IiiRh8D-ElOTd3awYLb4R_EJto3cTYU5jFSWBLGAknCwCyAo5L9OVW_Bx2copipFeXlWY1QcOVr3kRWY',
            userVisibleOnly: true,
          });
          console.debug('Push subscription created successfully:', subscription);
          console.log('Current subscription:', JSON.stringify(subscription));
        } catch (error) {
          console.error('Service Worker registration or subscription failed:', error);
        }
      } else {
        console.warn('Service Worker not supported in this browser.');
      }
    };

    // Request notification permission
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.debug('Notification permission granted');
        registerPushNotificationSW();
      } else {
        console.warn('Notification permission denied:', permission);
      }
    });

    // Cleanup: Only unregister if explicitly needed
    return () => {
      // Avoid unregistering unless necessary, as it removes push subscriptions
      // if (registration) {
      //   console.debug('Unregistering Service Worker');
      //   registration.unregister();
      // }
    };
  }, []);

  return null;
};

export default useServiceWorker;