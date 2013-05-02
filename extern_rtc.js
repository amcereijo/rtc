// functionality of the plugin
var ExternFunction = (function() {
	var liTitle = chrome.i18n.getMessage("liTitle"),
		liText = chrome.i18n.getMessage("liText"),
		titleText = chrome.i18n.getMessage("extName"),
		retweetText = chrome.i18n.getMessage("retweetText"),
		//rtc li element
		rtcLiElement,
		//to save the new tweet original title
		previusTitle = '',
		tweetButton,
		tweetDialog,
		tweetDialogTitle,
		tweetDialogContent,
		elementToObserv,
		allElementLoaded = false,

	//action when rtc li element is clicked
	clickRtc = function (e) {
		//avoid to execute "a" default action
		e.preventDefault();
		var target = e.target,
			//tweet element
			parent = $(target).closest('.content'),
			//tweet text
			tweetText = $(parent).find('.js-tweet-text').text(),
			//twitter user
			twitterUser = retweetText + $(parent).find('span.username').find('b').text()+ ' ';
		//click to open new tweet modal
		$(tweetButton).click();
		//save previus title
		previusTitle = $(tweetDialogTitle).text();
		//change modal title,add class to title elemento to find it later and remove orginal title class and center new title
		$(tweetDialogTitle).text(titleText)
			.addClass('rtcTitle')
			.removeClass('modal-title')
			.css('text-align','center');
		//add retweet text
		$(tweetDialogContent).find('div').text(twitterUser+tweetText);
	},

	//function to set original title, class and empty content
	clickNewTweet = function () {
		if(previusTitle !== ''){ 
			//remove center title, add original title class, remove temporal "rtc" title class and set original title
			$(tweetDialogTitle).css('text-align','')
				.addClass('modal-title')
				.removeClass('rtcTitle')
				.text(previusTitle);
			//remove retweet text
			$(tweetDialogContent).find('div').empty();
			previusTitle = '';
		}
	},


	//function to add li rtc elements and its actions
	addOptionsAndClickEvents = function () { 
		if($('ul.tweet-actions:not(.rtc)').length !== 0){
			//find elements with no rtc li option
			$('ul.tweet-actions:not(.rtc)').prepend(rtcLiElement)
			//add class to ul for mark as option rtc added
			$('ul.tweet-actions:not(.rtc)').addClass('rtc');
		}

		if(!allElementLoaded){
			//add click Rt+C 
    		$(elementToObserv).on('click', 'li.rtc', clickRtc);
			//add click function whe click open new tweet element
			$(tweetButton).click(clickNewTweet);
		}
	},

	//load shared elements
	loadElements = function () {
		//rtc li element
		rtcLiElement = '<li class="action-reply-container rtc"><a class="with-icn" data-modal="tweet-reply" href="#" title="'+liTitle+'"><i class="sm-rt"></i><b>'+liText+'</b></a></li>';
		tweetButton = $('#global-new-tweet-button');
		tweetDialog = $('#global-tweet-dialog');
		tweetDialogTitle = $(tweetDialog).find('.modal-title');
		tweetDialogContent = $('#tweet-box-global');
		elementToObserv = $('#page-outer');
	};

	//public methods
	return {
		initPlugin : function () {
			//avoid profile page
			if($('.profile.active').length === 0){
				loadElements();
				//add listener to add new tweet elements       
				insertionQ('li.js-stream-item').every(function(element){
	    			addOptionsAndClickEvents();
				});
				addOptionsAndClickEvents();
				allElementLoaded = true;
			}
		}
	}
})();

//execute when load
ExternFunction.initPlugin();

