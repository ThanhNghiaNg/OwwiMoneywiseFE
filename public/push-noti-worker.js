// /push-noti-worker.js
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing......');
  // Perform installation tasks (e.g., caching assets)
  event.waitUntil(
    self.skipWaiting() // Skip waiting immediately during install
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Claim clients to take control immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Received SKIP_WAITING message');
    self.skipWaiting(); // Activate the new SW
  }
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event received:', event);
  const title = 'Push Notification';
  const options = {
    body: event.data ? event.data.text() : 'Default message',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});