// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              if (confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Handle install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button or banner if desired
  showInstallBanner();
});

function showInstallBanner() {
  // You can add a custom install banner here
  console.log('App can be installed');
}

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
  console.log('MyVoice IE successfully installed!');
  if (app) {
    app.updateStatus('MyVoice IE successfully installed as PWA!');
  }
});