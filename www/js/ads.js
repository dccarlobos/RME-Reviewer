// ads.js
let adsInitialized = false;
let bannerAd = null;

export async function initAds() {
  if (adsInitialized) return;
  adsInitialized = true;

  if (!window.admob) {
    console.warn('AdMob not available');
    return;
  }

  try {
    await admob.start({
      requestTrackingAuthorization: true,
    });

    bannerAd = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', // TEST ID
      position: 'inline',
      adSize: 'BANNER',
    });

    await bannerAd.setPosition(
      document.getElementById('adBottom')
    );

    await bannerAd.show();
  } catch (e) {
    console.error('AdMob error:', e);
  }
}

export async function hideBannerAd() {
  if (bannerAd) {
    await bannerAd.hide();
  }
}