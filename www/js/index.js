      // index.js
let bannerVisible = false;
let bannerAd = null;

document.addEventListener('deviceready', async () => {
  await admob.start();

  bannerAd = new admob.BannerAd({
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    position: 'BOTTOM',
  });

  showBanner();
});

async function showBanner() {
  if (!bannerVisible && bannerAd) {
    bannerVisible = true;
    await bannerAd.show();
  }
}

function hideBanner() {
  if (bannerVisible && bannerAd) {
    bannerVisible = false;
    bannerAd.hide();
  }
}

window.addEventListener('beforeunload', hideBanner);