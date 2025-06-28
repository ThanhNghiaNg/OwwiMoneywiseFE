self.addEventListener('push', (event) => {
    const title = 'Get Started With Workbox';
    const options = {
      body: event.data.text()
    };
    console.log('Push event received only title:', event);
    console.log('Push event received with data text:', event.data.text());
    console.log('Push event received with data:', event.data);
    self.registration.showNotification(title, options)
  });