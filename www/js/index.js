document.addEventListener('deviceready', function() {
  // Ipakita ang system UI (navigation keys)
  if (window.AndroidFullScreen) {
    AndroidFullScreen.showSystemUI();
  }

  // Maghintay ng 3 seconds bago itago ang splash screen
  setTimeout(function() {
    navigator.splashscreen.hide();
  }, 3000);
}, false);