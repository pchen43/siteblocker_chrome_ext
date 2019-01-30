// Initialize function for blocking requests
var blocker = function(details)
	{ return {cancel: true}; }

// Array of blocked websites
distractions = ["*://*.facebook.com/*", 
				"*://*.instagram.com/*",
				"*://*.reddit.com/*",
				"*://*.imgur.com/*",
				"*://*.twitter.com/*",
				"*://*.tumblr.com/*"]

// Listen for message from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.directive) {
	case "timer-set":
		// Set delay for alarm to user input
		let delay = request.delay;
		
		// Create alarm 
		chrome.alarms.create("alarm", {delayInMinutes: delay});
		console.log("Timer has been set to " + delay + " minutes");

		// Execute webrequest blocking
		chrome.webRequest.onBeforeRequest.addListener(blocker,
			{urls: distractions},
			["blocking"]);
	
		sendResponse({});
		break;
	default:
		alert(request + "does not match from popup.js to background");
	}
})

// Listen for alarm to fire
chrome.alarms.onAlarm.addListener(function(alarm){
	
	// When alarm fires stop blocking
	chrome.webRequest.onBeforeRequest.removeListener(blocker,
	{urls: distractions},
	["blocking"]);

	console.log("Alarm has fired, blocking stopped");
	});


