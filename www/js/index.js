// js/index.js

document.addEventListener('deviceready', () => {
  console.log('Device ready');

  // Hide splash screen after 4 seconds
  setTimeout(() => {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
  }, 4000);

  // Init app logic
  initApp();
});

function initApp() {
  // Init AdMob once
  if (window.initAds) {
    initAds();
  }
}