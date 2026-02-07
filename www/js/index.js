// index.js

import { initAds, showBanner } from './ads.js';

document.addEventListener('deviceready', async () => {
  console.log('Device ready');

  // Initialize AdMob
  await initAds();

});