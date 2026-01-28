// js/ads.js
let adsInitialized = false;

async function initAds() {
  if (adsInitialized) return;
  adsInitialized = true;

  if (!window.admob) {
    console.warn('AdMob not available');
    return;
  }

  try {
    await admob.start({
      testDeviceIds: ['EMULATOR'],
      requestTrackingAuthorization: true,
    });

    const banner = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', // TEST
      position: 'bottom',
    });

    await banner.show();
    console.log('Bottom banner shown');
  } catch (e) {
    console.error('AdMob error', e);
  }
}