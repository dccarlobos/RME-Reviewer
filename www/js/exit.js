document.addEventListener("deviceready", function() {
    let backPressedOnce = false;

    document.addEventListener("backbutton", function(e) {
        if (backPressedOnce) {
            navigator.app.exitApp(); // isara ang app
            return;
        }

        backPressedOnce = true;
        alert("Press back again to exit");

        // reset after 2s
        setTimeout(function() {
            backPressedOnce = false;
        }, 2000);

        e.preventDefault(); // pigilan ang default back action
    }, false);
}, false);