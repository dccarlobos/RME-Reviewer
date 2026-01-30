// index.js

import { initAds, showBanner } from './ads.js';

document.addEventListener('deviceready', async () => {
  console.log('Device ready');

  // Initialize AdMob
  await initAds();

  // Show banner
  await showBanner('ca-app-pub-3940256099942544/6300978111', 'bottom');

  // Hide splash screen
  if (navigator.splashscreen) {
    navigator.splashscreen.hide();
  }

  // Redirect after 4s
  setTimeout(() => {
    window.location.href = "second.html";
  }, 4000);
});