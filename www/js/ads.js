     // ads.js
let adsInitialized = false;
let bannerAd = null; // I-save ang reference ng banner para hindi magdulot ng maraming ads

async function initAds() {
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
    console.log('AdMob SDK started');

    // Gumawa ng banner ad at ikabit sa isa sa inyong ad spaces
    bannerAd = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', // TEST ID
      position: 'inline', // Gamitin ang inline para maikabit sa elemento
      adSize: 'BANNER', // O iba pang sukat tulad ng 'SMART_BANNER'
    });

    // Ikabit ang ad sa #adBottom div (pwede rin #adTop kung gusto ninyo)
    await bannerAd.setPosition(document.getElementById('adBottom'));
    
    // Ipakita lang ang isang banner
    await bannerAd.show();
    console.log('Banner ad attached to UI and shown');
  } catch (e) {
    console.error('AdMob initialization error:', e);
  }
}

// Para ma-hide ang ad kung kailangan
async function hideBannerAd() {
  if (bannerAd) {
    await bannerAd.hide();
  }
}
