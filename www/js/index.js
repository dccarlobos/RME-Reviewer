      // index.js
document.addEventListener('deviceready', async () => {
  await admob.start();

  const banner = new admob.BannerAd({
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    position: 'BOTTOM',
  });

  await banner.show();
});