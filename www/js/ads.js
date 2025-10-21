// ads.js — Safe dual banner version for admob-plus-cordova
document.addEventListener("deviceready", initAds, false);

async function initAds() {
  console.log("📱 Device ready — initializing AdMob Plus...");

  // Check kung available ang AdMob plugin
  if (typeof admob === "undefined" || !admob.BannerAd) {
    console.warn("⚠️ AdMob plugin not found, loading test HTML ads instead...");
    loadTestHTMLAd("ad-space-1", "Ad Space 1 (Top)");
    loadTestHTMLAd("ad-space-2", "Ad Space 2 (Bottom)");
    return;
  }

  try {
    // ✅ Start AdMob SDK (required)
    await admob.start();
    console.log("✅ AdMob SDK started successfully");

    // ✅ Create and show Top Banner
    const topBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // Google test ad
      position: "top",
    });

    await topBanner.show();
    console.log("✅ Top banner displayed successfully");

    // ✅ Create and show Bottom Banner
    const bottomBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // same test ad
      position: "bottom",
    });

    await bottomBanner.show();
    console.log("✅ Bottom banner displayed successfully");

  } catch (err) {
    console.error("❌ AdMob initialization failed:", err);

    // Fallback HTML ads if AdMob fails
    loadTestHTMLAd("ad-space-1", "Ad Space 1 (Top)");
    loadTestHTMLAd("ad-space-2", "Ad Space 2 (Bottom)");
  }
}

// ✅ Local HTML test ad fallback
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