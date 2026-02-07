
    document.addEventListener('DOMContentLoaded', function() {
        // Show splash screen if in Cordova environment
        if (navigator.splashscreen) {
            navigator.splashscreen.show();
        }

        // Redirect to the next page after 3 seconds
        setTimeout(function() {
            // Hide splash screen if in Cordova environment
            if (navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            window.location.href = "second.html"; // Change to the target page
        }, 4000);
    });
