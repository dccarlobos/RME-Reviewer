// ads.js
let adsInitialized = false;

async function initAds() {
  if (adsInitialized) return;
  adsInitialized = true;

  if (!window.admob) {
    console.warn('AdMob not available');
    return;
  }

  try {
    // Initialize AdMob SDK
    await admob.start({
      requestTrackingAuthorization: true, // iOS privacy
    });
    console.log('AdMob SDK started');

    // Create and show a banner ad at the bottom
    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', // TEST ID
      position: 'bottom',
    });

    await banner.show();
    console.log('Bottom banner shown');
  } catch (e) {
    console.error('AdMob initialization error:', e);
  }
}