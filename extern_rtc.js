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
		closeModalNewTweetElement,
		filterPromoted = false,

	//action when rtc li element is clicked
	clickRtc = function (e) {
		//avoid to execute "a" default action
		e.preventDefault();
		var target = e.target,
			//tweet element
			parent = $(target).closest('.content'),
			//tweet text
			tweetText = parent.find('.js-tweet-text').text(),
			//twitter user
			twitterUser = retweetText + parent.find('span.username').find('b').text()+ ' ';
		//click to open new tweet modal
		tweetButton.click();
		//save previus title
		previusTitle = tweetDialogTitle.text();
		//change modal title,add class to title elemento to find it later and remove orginal title class and center new title
		tweetDialogTitle.text(titleText)
			.addClass('rtcTitle')
			.removeClass('modal-title')
			.css('text-align','center');

		chrome.storage.local.get('auto_message_active', function(data) {
	      if (data.auto_message_active) {
	      	chrome.storage.local.get('auto_text', function(data) {
		      var autoMessage = (data.auto_text)?data.auto_text:'';
		      //add retweet text
		      tweetDialogContent.find('div').text(autoMessage+twitterUser+tweetText);
		    });
	      }else{
	      	//add retweet text
	      	tweetDialogContent.find('div').text(twitterUser+tweetText);
	      }
	    });
	},

	//function to set original title, class and empty content
	clickNewTweet = function (e) {
		if(previusTitle !== '') {
			//remove center title, add original title class, remove temporal "rtc" title class and set original title
			$(tweetDialogTitle).css('text-align','')
				.addClass('modal-title')
				.removeClass('rtcTitle')
				.text(previusTitle);
			//remove retweet text
			tweetDialogContent.find('div').empty().html('<br/>');
			previusTitle = '';
			tweetDialogContent.focus();
		}
	},

	//function to add li rtc elements and its actions
	addOptionsAndClickEvents = function (elements) {
		var actionsFooter = elements.find('.js-actions:not(.rtc)');
		
		if(actionsFooter.length !== 0) {
			//add class to ul for mark as option rtc added and add rtc opction
			actionsFooter.addClass('rtc').prepend(rtcLiElement);
		}
		if(!allElementLoaded) {
			//add click Rt+C
    		elementToObserv.on('click', 'div.js-rtc', clickRtc);
		}
	},

	filterPromoted = function (tweets) {
		chrome.storage.local.get('filter_promoted', function(data) {
			var promoted;
			if(data.filter_promoted) {
				promoted = tweets.find('.js-action-profile-promoted').closest('.js-stream-item');
				promoted.remove();
				promoted = tweets.find('.js-promoted-badge').closest('.js-stream-item');;
				promoted.remove();
			}
		});
		
	},

	//load shared elements
	loadElements = function () {
		//rtc li element
		//rtcLiElement = '<li class="action-reply-container rtc"><a role="button" class="with-icn js-tooltip" data-modal="tweet-reply" href="#" data-original-title="'+liTitle+'"><span class="Icon Icon--reply"></span><b>'+liText+'</b></a></li>';
		rtcLiElement = '<div class="ProfileTweet-action ProfileTweet-action--reply js-rtc"><button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionReply js-tooltip" data-modal="ProfileTweet-reply" type="button" data-original-title="'+liTitle+'"><span class="Icon Icon--reply username">'+liText+'</span><span class="ProfileTweet-actionCount u-textUserColorHover ProfileTweet-actionCount--isZero"><span class="ProfileTweet-actionCountForPresentation" aria-hidden="true"></span></span></button></div>';
		tweetButton = $('#global-new-tweet-button');
		tweetDialog = $('#global-tweet-dialog');
		tweetDialogTitle = tweetDialog.find('.modal-title');
		tweetDialogContent = $('#tweet-box-global');
		elementToObserv = $('#page-outer');
		closeModalNewTweetElement = $('.modal-close.js-close');
	};

	//public methods
	return {
		initPlugin : function () {
			var parent, tweets;
			//avoid profile page
			if($('.profile.active').length === 0) {
				loadElements();
				//add listener to add new tweet elements
				insertionQ('li.js-stream-item').summary(function(tweets) {
					var jqtweets = $(tweets);
	    			addOptionsAndClickEvents(jqtweets);
	    			filterPromoted(jqtweets);	

				});
				
				parent = $('.content-main');
				addOptionsAndClickEvents(parent);
				tweets = parent.find('.js-stream-item');
				filterPromoted(tweets);
				
				allElementLoaded = true;
				//add listener to new tweet close button
				closeModalNewTweetElement.on('click', clickNewTweet);
			}
		}
	}
})();

//execute when load
ExternFunction.initPlugin();

