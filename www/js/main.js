document.addEventListener('deviceready', function() {
    // Ang iyong code na gumagamit ng mga plugin ay dapat ilagay dito
    console.log("Cordova is ready!");

    // Halimbawa, gamitin ang Social Sharing plugin:
    if (window.plugins && window.plugins.socialsharing) {
        window.plugins.socialsharing.share(
            'Check out this RME Reviewer App!', // mensahe
            'RME Reviewer',                      // subject
            null,                                // file (null para wala)
            'https://play.google.com/store/apps/details?id=com.dccarlobos.rmereviewer', // link
            function() { console.log('share ok') }, // success callback
            function(errormsg){ alert(errormsg) }   // error callback
        );
    } else {
        console.log("SocialSharing plugin not available!");
        alert("SocialSharing plugin not available!");
    }

    // Halimbawa, gamitin ang InAppBrowser plugin:
    if (cordova && cordova.InAppBrowser) {
        cordova.InAppBrowser.open('https://www.google.com', '_system');
    } else {
        console.log("InAppBrowser plugin not available!");
        alert("InAppBrowser plugin not available!");
    }
}, false);
