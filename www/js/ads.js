// ads.js — safe version with two AdMob banners
document.addEventListener("deviceready", initAds, false);

async function initAds() {
  console.log("Device ready — initializing AdMob Plus...");

  try {
    await admob.start();
    console.log("AdMob SDK started ✅");

    // Banner 1 - Top
    const topBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "top",
    });
    await topBanner.show();
    console.log("Top banner displayed ✅");

    // Banner 2 - Bottom
    const bottomBanner = new admob.BannerAd({
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "bottom",
    });
    await bottomBanner.show();
    console.log("Bottom banner displayed ✅");

  } catch (err) {
    console.error("⚠️ AdMob initialization failed:", err);
    // Fallback test ads
    loadTestHTMLAd("ad-space-1", "Top Ad");
    loadTestHTMLAd("ad-space-2", "Bottom Ad");
  }
}

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
    ">
      <strong>${adName}</strong><br>
      Test Ad (No AdMob)
    </div>
  `;
}