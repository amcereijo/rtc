
$(document).ready(function () {
	var rtcText = chrome.i18n.getMessage('pageMessage'),
		saveButtonText = chrome.i18n.getMessage('buttonSave'),
		textPlaceholder = chrome.i18n.getMessage('textPlaceholder'),
		automessageText = chrome.i18n.getMessage('automessage'),
		pluginTitle = chrome.i18n.getMessage('pluginTitle'),
		filterPromotedText = chrome.i18n.getMessage('filterPromotedText'),
		textEl = $('#text'),
		saveButton = $('#save'),
		autoTextCheckEl = $('#autoTextCheck'),
		filterPromotedCheck = $('#filterPromotedCheck'),
		autoSaveActivate = function(){
			if(textEl.attr('disabled')){
				textEl.removeAttr('disabled');
				saveAutoMessageActive(true);
			}else{
				textEl.attr('disabled','disabled');
				saveAutoMessageActive(false);
			}
			
		},
		saveValue = function(){
			if(textEl.val()!==''){
				chrome.storage.local.set({'auto_text': textEl.val()});
			}
		},
		removeValue = function(){
			chrome.storage.local.remove('auto_text');
		},
		saveAutoMessageActive = function(save){
			chrome.storage.local.set({'auto_message_active': save});
		},
		savePromotedValue = function (ev) {
			chrome.storage.local.set({'filter_promoted': ev.target.checked});
		};
	
	//$('.message_div').innerHTML(rtcText);
	$('#automessage').text(automessageText);
	$('#form_div').attr('title',pluginTitle);
	textEl.attr('placeholder',textPlaceholder);
	saveButton.val(saveButtonText);
	autoTextCheckEl.click(autoSaveActivate);
	saveButton.click(saveValue);
	$('#filterPromoted').text(filterPromotedText);
	filterPromotedCheck.on('change', savePromotedValue);
	

	//plugin page filter
	var filters = {
	  url: [{urlContains: 'https://twitter.com/'.replace(/^https?\:\/\//, '')}]
	};

	//listener for pages (only twitter using 'filters' var)
	chrome.webNavigation.onCompleted.addListener(
		function(){
			chrome.tabs.executeScript(null, {file: 'extern_rtc.js'});
		}
		,filters
	);

	
	chrome.storage.local.get('auto_text', function(data) {
      if (data.auto_text) {
      	textEl.val(data.auto_text); 
      }
    });

	chrome.storage.local.get('auto_message_active', function(data) {
      if (data.auto_message_active) {
      	autoTextCheckEl.attr('checked','checked');
      	textEl.removeAttr('disabled');
      }
    });

    chrome.storage.local.get('filter_promoted', function(data) {
		if (data.filter_promoted) {
      		filterPromotedCheck.attr('checked','checked');
      	}
	});
    
});