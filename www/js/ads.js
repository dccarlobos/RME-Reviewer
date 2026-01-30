// ads.js

let adsInitialized = false;
let activeBanners = []; // Track active banners (max 2)

export async function initAds() {
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
  } catch (e) {
    console.error('AdMob initialization error:', e);
  }
}

/**
 * Show a banner ad
 * @param {string} adUnitId - AdMob unit ID
 * @param {string} position - 'top' or 'bottom'
 */
export async function showBanner(adUnitId, position = 'bottom') {
  try {
    // If already 2 banners, hide the oldest
    if (activeBanners.length >= 2) {
      const oldBanner = activeBanners.shift();
      await oldBanner.hide();
      console.log('Old banner hidden');
    }

    // Create new banner (small BANNER size)
    const banner = new admob.BannerAd({
      adUnitId: adUnitId,
      adSize: 'BANNER',  // small 320x50
      position: position,
    });

    await banner.show();
    console.log('New banner shown:', adUnitId);

    // Add to active banners array
    activeBanners.push(banner);

  } catch (e) {
    console.error('Error showing banner:', e);
  }
}

/**
 * Hide all active banners
 */
export async function hideAllBanners() {
  for (let banner of activeBanners) {
    await banner.hide();
  }
  activeBanners = [];
  console.log('All banners hidden');
}