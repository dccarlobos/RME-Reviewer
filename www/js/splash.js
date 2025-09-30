document.addEventListener('deviceready', function() {
    // Ipakita ang splash screen
    if (navigator.splashscreen) {
        navigator.splashscreen.show();
    }

    // Redirect sa next page pagkatapos ng 3 seconds
    setTimeout(function() {
        // I-hide ang splash screen bago mag-redirect
        if (navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
        window.location.href = "second.html"; // Palitan depende sa target page
    }, 4000);
}, false);
