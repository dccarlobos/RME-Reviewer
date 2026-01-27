// ads.js — STABLE AdMob setup for Ionic Appflow + Cordova
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Delay a bit for extra safety (Appflow)
  setTimeout(initAds, 1000);
}

async function initAds() {
  if (!window.admob || !admob.BannerAd) {
    console.warn("⚠️ AdMob plugin not available");
    return;
  }

  try {
    // Configure AdMob
    await admob.configure({
      testDeviceIds: ["EMULATOR"], // dagdagan ng device ID kung real device
      childDirectedTreatment: false,
      underAgeOfConsent: false,
    });

    await admob.start();

    // ✅ TOP BANNER
    const topBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // TEST BANNER
      position: "top",
      margin: 0,
    });

    topBanner.on('load', () => console.log('✅ Top banner loaded'));
    topBanner.on('fail', (err) => console.error('❌ Top banner failed', err));
    await topBanner.show();

    // ✅ BOTTOM BANNER
    const bottomBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // TEST BANNER
      position: "bottom",
      margin: 0,
    });

    bottomBanner.on('load', () => console.log('✅ Bottom banner loaded'));
    bottomBanner.on('fail', (err) => console.error('❌ Bottom banner failed', err));
    await bottomBanner.show();

  } catch (err) {
    console.error("❌ AdMob failed:", err);
  }
}
