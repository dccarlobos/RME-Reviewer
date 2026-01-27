// ads.js — STABLE AdMob setup for Ionic Appflow + Cordova
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Delay a bit for extra safety (Appflow)
  setTimeout(initAds, 500);
}

async function initAds() {
  if (!window.admob || !admob.BannerAd) {
    console.warn("⚠️ AdMob plugin not available");
    return;
  }

  try {
    // Configure AdMob (TEST MODE)
    await admob.configure({
      testDeviceIds: ["EMULATOR"],
      childDirectedTreatment: false,
      underAgeOfConsent: false,
    });

    await admob.start();

    // ✅ BOTTOM BANNER (RECOMMENDED)
    const banner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // TEST BANNER
      position: "bottom",
      margin: 0,
    });

    await banner.show();

    console.log("✅ AdMob banner loaded successfully");

  } catch (err) {
    console.error("❌ AdMob failed:", err);
  }
}