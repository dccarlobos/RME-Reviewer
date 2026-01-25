// ads.js — Real AdMob banners, safe for BlueStacks/real devices
document.addEventListener("deviceready", initAds, false);

async function initAds() {
  if (typeof admob === "undefined" || !admob.BannerAd) {
    console.warn("⚠️ AdMob plugin not found, loading HTML fallback ads...");
    loadTestHTMLAd("ad-space-1", "Ad Space 1 (Top)");
    loadTestHTMLAd("ad-space-2", "Ad Space 2 (Bottom)");
    return;
  }

  try {
    // Configure test device first
    await admob.configure({
      testDeviceIds: ["EMULATOR"], // BlueStacks test device
    });

    await admob.start();

    // TOP banner
    const topBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "top",
    });
    await topBanner.show();

    // BOTTOM banner
    const bottomBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "bottom",
    });
    await bottomBanner.show();

    console.log("✅ Real AdMob banners displayed successfully");

  } catch (err) {
    console.error("❌ AdMob error:", err);
    // Fallback
    loadTestHTMLAd("ad-space-1", "Ad Space 1 (Top)");
    loadTestHTMLAd("ad-space-2", "Ad Space 2 (Bottom)");
  }
}

// Fallback HTML ads
function loadTestHTMLAd(elementId, adName) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.innerHTML = `
    <div style="
      background: linear-gradient(90deg, #06b6d4, #0284c7);
      color: white;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      margin: 5px;
    ">
      <strong>${adName}</strong><br>
      Test Ad (HTML fallback)
    </div>
  `;
}