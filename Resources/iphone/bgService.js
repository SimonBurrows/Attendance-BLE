function notify(msg) {
    Ti.App.iOS.scheduleLocalNotification({
        alertBody: msg,
        alertAction: "OK",
        userInfo: {
            hello: "world"
        },
        date: new Date(new Date().getTime() + 5)
    });
}

var TiBeacons = require("org.beuckman.tibeacons");

TiBeacons.addEventListener("beaconRanges", function(event) {
    for (var i in event.beacons) {
        var b = event.beacons[i];
        switch (b.proximity) {
          case "immediate":
            notify("Found " + b.major + "/" + b.minor + " in immediate proximity!");
            break;

          case "near":
            notify("Found " + b.major + "/" + b.minor + " in near proximity!");
        }
    }
});

TiBeacons.startRangingForBeacons({
    uuid: "00000000-0000-0000-0000-000000000000",
    identifier: "TiBeacon Test"
});

Ti.App.currentService.addEventListener("stop", function() {
    TiBeacons.stopRangingForBeacons();
});