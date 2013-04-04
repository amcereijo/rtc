
$(document).ready(function () {
	var rtcText = chrome.i18n.getMessage("pageMessage");
	$('.message_div').innerHTML(rtcText);

	//plugin page filter
	var filters = {
	  url: [{urlContains: "https://twitter.com/".replace(/^https?\:\/\//, '')}]
	};

	//listener for pages (only twitter using "filters" var)
	chrome.webNavigation.onCompleted.addListener(
		function(){
			chrome.tabs.executeScript(null, {file: "extern_rtc.js"});
		}
		,filters
	);
});