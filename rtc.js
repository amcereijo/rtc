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

chrome.tabs.onUpdated.addListener(function(tab_id, changeInfo, tab) {
	//alert(changeInfo.status + ','+changeInfo.url.indexOf('/twitter.com/'));
    if(changeInfo.status == 'loading' && changeInfo.url) {
    	chrome.tabs.executeScript(null, {file: "extern_rtc.js"});
        
    }
});