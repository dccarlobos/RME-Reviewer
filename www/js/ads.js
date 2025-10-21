// ads.js
document.addEventListener("deviceready", initAds, false);

function initAds() {
  console.log("Device ready - initializing ads...");

  // Detect kung may AdMob plugin
  if (typeof admob !== "undefined" && admob.banner) {
    console.log("AdMob plugin detected ✅");

    // --- AdMob REAL ADS --- (palitan mo ang mga ID na ito kapag may sarili kang Ad Unit IDs)
    const adConfig1 = {
      adUnitId: "ca-app-pub-3940256099942544/6300978111", // ✅ Test banner (AdMob test ID)
      position: "top", // pwede 'top' o 'bottom'
      isTesting: true,
    };

    const adConfig2 = {
      adUnitId: "ca-app-pub-3940256099942544/6300978111",
      position: "bottom",
      isTesting: true,
    };

    // Show banners
    admob.banner.show(adConfig1).then(() => {
      console.log("Ad Space 1 loaded successfully!");
    }).catch(console.error);

    admob.banner.show(adConfig2).then(() => {
      console.log("Ad Space 2 loaded successfully!");
    }).catch(console.error);

  } else {
    console.warn("⚠️ AdMob plugin not found — showing test ads only.");

    // --- TEST ADS ONLY (HTML Mock Ads) ---
    loadTestHTMLAd("ad-space-1", "Ad Space 1");
    loadTestHTMLAd("ad-space-2", "Ad Space 2");
  }
}

// Function to show placeholder test ads
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
    ">
      <strong>${adName}</strong><br>
      Test Ad (No AdMob plugin detected)
    </div>
  `;
}