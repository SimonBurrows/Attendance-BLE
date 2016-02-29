function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateInformation(event) {
        Ti.API.info("updateInformation called");
        if ("blueberry" === event.identifier) {
            $.marshmellowProximity.text = event.proximity;
            $.marshmellowRSSI.text = event.rssi;
            if ("near" === event.proximity) Ti.API.info("proximity called near"); else if ("immediate" === event.proximity) {
                Ti.API.info("proximity called immediate");
                notify();
            } else "far" === event.proximity && Ti.API.info("proximity called far");
        } else if ("MacBookPro" === event.identifier) {
            $.mintProximity.text = event.proximity;
            $.mintRSSI.text = event.rssi;
            "near" === event.proximity ? Ti.API.info("Near") : "far" === event.proximity && Ti.API.info("Far");
        }
    }
    function toggleRanging() {
        if ($.rangingSwitch.value) {
            TiBeacons.startRangingForBeacons({
                uuid: "E3EFA72E-B6EC-4B0D-B3F9-9A2ABCEAC57F",
                identifier: "blueberry"
            });
            TiBeacons.startRangingForBeacons({
                uuid: "08D4A950-80F0-4D42-A14B-D53E063516E6",
                identifier: "MacBookPro",
                major: 61001,
                minor: 13001
            });
            TiBeacons.startRangingForBeacons({
                uuid: "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                identifier: "marshmellow",
                major: 8702,
                minor: 11168
            });
        } else TiBeacons.stopRangingForBeacons();
    }
    function notify() {
        Ti.App.iOS.scheduleLocalNotification({
            date: new Date(new Date().getTime() + 2200),
            alertBody: "Hey Adnan, make sure you wear seat belts!",
            badge: 1,
            sound: "default",
            userInfo: {
                url: "http://www.download.com/resource/asset.json",
                id: "1"
            },
            category: "DOWNLOAD_CONTENT"
        });
        if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
            Ti.API.info("I am iOS 8!");
            var acceptAction = Ti.App.iOS.createUserNotificationAction({
                identifier: "ACCEPT_IDENTIFIER",
                title: "Accept",
                activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_FOREGROUND,
                destructive: false,
                authenticationRequired: true
            });
            var rejectAction = Ti.App.iOS.createUserNotificationAction({
                identifier: "REJECT_IDENTIFIER",
                title: "Reject",
                activationMode: Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
                destructive: true,
                authenticationRequired: false
            });
            var downloadContent = Ti.App.iOS.createUserNotificationCategory({
                identifier: "DOWNLOAD_CONTENT",
                actionsForDefaultContext: [ acceptAction, rejectAction ]
            });
            Ti.App.iOS.registerUserNotificationSettings({
                types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND ],
                categories: [ downloadContent ]
            });
            Ti.App.iOS.addEventListener("localnotificationaction", function(e) {
                "DOWNLOAD_CONTENT" == e.category && "ACCEPT_IDENTIFIER" == e.identifier && alert("start download");
                e.badge > 0 && Ti.App.iOS.scheduleLocalNotification({
                    date: new Date(new Date().getTime() + 3e3),
                    badge: "-1"
                });
                Ti.API.info(JSON.stringify(e));
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "white",
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "30",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "horizontal",
        height: "35",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Ranging",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.rangingSwitch = Ti.UI.createSwitch({
        value: false,
        id: "rangingSwitch"
    });
    $.__views.__alloyId2.add($.__views.rangingSwitch);
    toggleRanging ? $.addListener($.__views.rangingSwitch, "change", toggleRanging) : __defers["$.__views.rangingSwitch!change!toggleRanging"] = true;
    $.__views.marshmellow = Ti.UI.createView({
        backgroundColor: "#94d8f8",
        height: 100,
        width: 250,
        top: 10,
        id: "marshmellow"
    });
    $.__views.__alloyId0.add($.__views.marshmellow);
    $.__views.deviceTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 10,
        left: 5,
        text: "Adnan iBeacon",
        id: "deviceTitle"
    });
    $.__views.marshmellow.add($.__views.deviceTitle);
    $.__views.marshmellowProximity = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 30
        },
        color: "#000",
        top: 30,
        left: 5,
        text: "Proximity",
        id: "marshmellowProximity"
    });
    $.__views.marshmellow.add($.__views.marshmellowProximity);
    $.__views.marshmellowRSSI = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 30
        },
        color: "#000",
        top: 30,
        right: 5,
        text: "RSSI",
        id: "marshmellowRSSI"
    });
    $.__views.marshmellow.add($.__views.marshmellowRSSI);
    $.__views.mint = Ti.UI.createView({
        backgroundColor: "#a0cbad",
        height: 100,
        width: 250,
        top: 10,
        id: "mint"
    });
    $.__views.__alloyId0.add($.__views.mint);
    $.__views.deviceTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 10,
        left: 5,
        text: "MacbookPro",
        id: "deviceTitle"
    });
    $.__views.mint.add($.__views.deviceTitle);
    $.__views.mintProximity = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 30
        },
        color: "#000",
        top: 30,
        left: 5,
        text: "Proximity",
        id: "mintProximity"
    });
    $.__views.mint.add($.__views.mintProximity);
    $.__views.mintRSSI = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 30
        },
        color: "#000",
        top: 30,
        right: 5,
        text: "RSSI",
        id: "mintRSSI"
    });
    $.__views.mint.add($.__views.mintRSSI);
    $.__views.adspace = Ti.UI.createImageView({
        top: 10,
        width: 141,
        height: 100,
        backgroundColor: "#fff",
        id: "adspace"
    });
    $.__views.__alloyId0.add($.__views.adspace);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var TiBeacons = require("org.beuckman.tibeacons");
    Ti.API.info("module is => " + TiBeacons);
    TiBeacons.addEventListener("beaconProximity", updateInformation);
    $.win.open();
    __defers["$.__views.rangingSwitch!change!toggleRanging"] && $.addListener($.__views.rangingSwitch, "change", toggleRanging);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;