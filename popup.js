/*// Global variable that has array of whitelisted websites that are input by the user
var whitelist = [];

// Add each user submission to whitelist on each click of Add button
document.getElementById('whitelist').onsubmit = function (){
	// Store site to be whitelisted
	let site = document.getElementById('sites').value;
	
	// Check that user isnt trying to submit empty text box
	if (site == '')
	{
		return false;
	}
	
	// Insert URL into array
	whitelist.push(site);
	console.log(whitelist);
	
	// Reset text box to allow for multiple URL submissions to website
	document.getElementById('whitelist').reset()
	return false;
}*/

function submitHandler(e){
	// Check to make sure user has entered amount of time
	if (document.getElementById('minutes').value == '' || document.getElementById('minutes').value =='0')
	{
		return false;
	}

	// store time that user input in variable delay to be used in alarm
	var delay = parseFloat(document.getElementById('minutes').value);
	
	//send message to background
	chrome.runtime.sendMessage({directive: "timer-set", delay: delay}, function(response) {
		this.close(); //close popup when background processes request
	});
}

document.addEventListener('DOMContentLoaded', function() {
	// listen for submit
	document.getElementById('timer').addEventListener('submit', submitHandler);
});



