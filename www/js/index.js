// index.js
import { initAds, showBanner } from './ads.js';

document.addEventListener('deviceready', async () => {
  console.log('Device ready');

  // Initialize AdMob
  await initAds();

  // Show first banner at bottom
  await showBanner('ca-app-pub-3940256099942544/6300978111', 'bottom');

  // OPTIONAL: Show second banner at top (uncomment kung gusto)
  // await showBanner('ca-app-pub-3940256099942544/2934735716', 'top');

  // Hide splash screen after 4 seconds
  setTimeout(() => {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
      console.log('Splash screen hidden');
    }
  }, 4000);

}, false);