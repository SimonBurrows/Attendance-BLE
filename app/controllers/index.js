if (OS_IOS) {
	var TiBeacons = require('org.beuckman.tibeacons');
	Ti.API.info("module is => " + TiBeacons);

	function updateInformation(event) {
		Ti.API.info('updateInformation called');
		if (event.identifier === "blueberry") {
			$.marshmellowProximity.text = event.proximity;
			$.marshmellowRSSI.text = event.rssi;
			if (event.proximity === 'near') {
				Ti.API.info('proximity called near');
				//notify("Boomb has been detected near by you!!!", "/Sound/Near.mp3");				
				//$.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/963767/142706050/stock-photo-marshmallows-142706050.jpg';
			} else if (event.proximity === 'immediate') {
				Ti.API.info('proximity called immediate');
				notify();
				//notify("Boomb has been detected immediate by you!!!", "/Sound/Immediate.mp3");
			} else if (event.proximity === 'far') {
				Ti.API.info('proximity called far');
				//notify("Boomb has been detected far by you!!!", "/Sound/Far.mp3");
			}
		} else if (event.identifier === "MacBookPro") {
			$.mintProximity.text = event.proximity;
			$.mintRSSI.text = event.rssi;
			if (event.proximity === 'near') {
				//	notify("Boomb has been detected near by you!!!", "/Sound/LaptopNear.mp3");
				//$.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/963767/142706050/stock-photo-marshmallows-142706050.jpg';
				Ti.API.info('Near');
			} else if (event.proximity === 'far') {
				//notify("Boomb has been detected far by you!!!", "/Sound/LaptopFar.mp3");
				Ti.API.info('Far');
			}
		}

	}

	function addEventToScroller(event) {
		Ti.API.info('event: ' + event);
		$.trace.add(Ti.UI.createLabel({
			text : JSON.stringify(event)
		}));
	}

	function enterRegion(e) {
		Ti.API.info('enterRegion ' + JSON.stringify(e));
	}

	function exitRegion(e) {
		Ti.API.info('exitRegion: ' + JSON.stringify(e));
	}


	TiBeacons.addEventListener("beaconProximity", updateInformation);
	//TiBeacons.addEventListener("enteredRegion", enterRegion);
	//TiBeacons.addEventListener("exitedRegion", exitRegion);

	function toggleRanging() {
		if ($.rangingSwitch.value) {
			TiBeacons.startRangingForBeacons({
				uuid : 'E3EFA72E-B6EC-4B0D-B3F9-9A2ABCEAC57F',
				//identifier : "mint",
				identifier : "blueberry"
				// major: 7784,
				// minor: 50141
			});

			TiBeacons.startRangingForBeacons({
				uuid : "08D4A950-80F0-4D42-A14B-D53E063516E6",
				identifier : "MacBookPro",
				major : 61001,
				minor : 13001
			});

			TiBeacons.startRangingForBeacons({
				uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
				identifier : "marshmellow",
				major : 8702,
				minor : 11168
			});

		} else {
			TiBeacons.stopRangingForBeacons();
		}
	}

	// var service = Ti.App.iOS.registerBackgroundService({
	//     url: "bgService.js"
	// });

	function notify() {
		/*
		var notification = Ti.App.iOS.scheduleLocalNotification({
		alertBody : msg,
		sound: sound,
		alertAction : "OK",
		userInfo : {
		"hello" : "world"
		},
		//    sound:"whoosh.mp3",
		date : new Date(new Date().getTime() + 5) // 5 milliseconds after being asked
		});
		*/
		// Send a notification in 3 seconds
		var note = Ti.App.iOS.scheduleLocalNotification({
			date : new Date(new Date().getTime() + 2200),
			alertBody : "Hey Adnan, make sure you wear seat belts!",
			badge : 1,
			sound : 'default',
			userInfo : {
				"url" : "http://www.download.com/resource/asset.json",
				id : "1"
			},
			category : "DOWNLOAD_CONTENT"
		});

		// Check for iOS 8 or greater
		if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
			Ti.API.info("I am iOS 8!");
			// Create notification actions
			var acceptAction = Ti.App.iOS.createUserNotificationAction({
				identifier : "ACCEPT_IDENTIFIER",
				title : "Accept",
				activationMode : Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_FOREGROUND,
				destructive : false,
				authenticationRequired : true
			});

			var rejectAction = Ti.App.iOS.createUserNotificationAction({
				identifier : "REJECT_IDENTIFIER",
				title : "Reject",
				activationMode : Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
				destructive : true,
				authenticationRequired : false
			});
			// Create a notification category
			var downloadContent = Ti.App.iOS.createUserNotificationCategory({
				identifier : "DOWNLOAD_CONTENT",
				actionsForDefaultContext : [acceptAction, rejectAction]
			});
			// Register for user notifications and categories
			Ti.App.iOS.registerUserNotificationSettings({
				types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND],
				categories : [downloadContent]
			});
			// Monitor notifications received while app is in the background
			Ti.App.iOS.addEventListener('localnotificationaction', function(e) {
				if (e.category == "DOWNLOAD_CONTENT" && e.identifier == "ACCEPT_IDENTIFIER") {
					alert("start download");
				}

				// Reset the badge value
				if (e.badge > 0) {
					Ti.App.iOS.scheduleLocalNotification({
						date : new Date(new Date().getTime() + 3000),
						badge : "-1"
					});
				}
				Ti.API.info(JSON.stringify(e));
			});
		}
	}

} else if (OS_ANDROID) {
	var iBeacon = require('miga.tibeacon');
	// register success Callback and set interval to 30sec
	iBeacon.initBeacon({
		success : onSuccess,
		error : onError,
		interval : 30,
		region : onRegion,
		found : onFound
	});

	function onSuccess(e) {
		Ti.API.info('onSuccess: ' + JSON.stringify(e));
		if (event.type === "Estimote") {
			$.marshmellowProximity.text = event.proximity;
			$.marshmellowRSSI.text = event.rssi;
			if (event.proximity === 'near') {
				notify("Boomb has been detected near by you!!!", "/Sound/Near.mp3");
				//$.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/963767/142706050/stock-photo-marshmallows-142706050.jpg';
			} else if (event.proximity === 'immediate') {
				notify("Boomb has been detected immediate by you!!!", "/Sound/Immediate.mp3");
			} else if (event.proximity === 'far') {
				notify("Boomb has been detected far by you!!!", "/Sound/Far.mp3");
			}
		}
	}

	function onRegion(e) {
		Ti.API.info('onRegion: ' + JSON.stringify(e));
		if (event.type === "Estimote") {
			$.marshmellowProximity.text = event.proximity;
			$.marshmellowRSSI.text = event.rssi;
			if (event.proximity === 'near') {
				notify("Boomb has been detected near by you!!!", "/Sound/Near.mp3");
				//$.adspace.image = 'http://image.shutterstock.com/display_pic_with_logo/963767/142706050/stock-photo-marshmallows-142706050.jpg';
			} else if (event.proximity === 'immediate') {
				notify("Boomb has been detected immediate by you!!!", "/Sound/Immediate.mp3");
			} else if (event.proximity === 'far') {
				notify("Boomb has been detected far by you!!!", "/Sound/Far.mp3");
			}
		}

	}

	function onFound(e) {
		Ti.API.info('onFound: ' + JSON.stringify(e));
	}

	function onError(e) {
		Ti.API.info('onError: ' + JSON.stringify(e));
	}

	if (iBeacon.isEnabled()) {
		iBeacon.startScanning();
		iBeacon.stopScanning();
	}
}

$.win.open();
