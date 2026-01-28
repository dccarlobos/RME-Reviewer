// index.js
document.addEventListener('deviceready', async () => {
  console.log('Device ready');

  // Initialize Ads
  await initAds();

  // Hide splash screen after 4 seconds
  setTimeout(() => {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
      console.log('Splash screen hidden');
    }
  }, 4000);

}, false);