// functionality of the plugin
var ExternFunction = (function() {
	//rtc li element
	var rtcLiElement = '<li class="action-reply-container rtc"><a class="with-icn" data-modal="tweet-reply" href="#" title="Rt+C"><i class="sm-reply"></i><b>Rt+C</b></a></li>';
	//to save the new tweet original title
	var previusTitle;

	//action when rtc li element is clicked
	var clickRtc = function (e) {
		//avoid to execute "a" default action
		e.preventDefault();
		var target = e.target;
		//tweet element
		var parent = $(target).parent().parent().parent().parent().parent();
		//tweet text
		var tweetText = $(parent).find('.js-tweet-text').text();
		//twitter user
		var twitterUser = ' RT @' + $(parent).find('span.username').find('b').text()+ ' ';

		//remove click function when click open "new tweet" element
		$('#global-new-tweet-button').unbind('click');

		//click to open new tweet modal
		$('#global-new-tweet-button').click();

		//add click function when click open "new tweet" element
		$('#global-new-tweet-button').click(clickNewTweet);

		//save previus title
		previusTitle = $('#global-tweet-dialog').find('.modal-title').text();
		//change modal title
		$('#global-tweet-dialog').find('.modal-title').text('Rt+C');
		//add class to title elemento to find it later
		$('#global-tweet-dialog').find('.modal-title').addClass('rtcTitle');
		//remove orginal title class
		$('#global-tweet-dialog').find('.rtcTitle').removeClass('modal-title');
		//center new title
		$('.rtcTitle').css('text-align','center');
		
		//add retweet text
		$('#tweet-box-global').find('div').text(twitterUser+tweetText);
	};

	//function to set original title, class and empty content
	var clickNewTweet = function () {
		//remove center title
		$('.rtcTitle').css('text-align','');
		//add original title class
		$('#global-tweet-dialog').find('.rtcTitle').addClass('modal-title');
		//remove temporal "rtc" title class
		$('#global-tweet-dialog').find('.modal-title').removeClass('rtcTitle');
		//set original title
		$('#global-tweet-dialog').find('.modal-title').text(previusTitle);
		//remove retweet text
		//$('#tweet-box-global').find('div').text('');
		$('#tweet-box-global').find('div').empty();
	};

	//function for page tree modification
	var treeModifi = function () {
		if($('ul.tweet-actions:not(.rtc)').length !== 0){
			addOption();
		}
	};

	//function to add li rtc elements and its actions
	var addOption = function () {
		if($('ul.tweet-actions:not(.rtc)').length>0){
			//remove tree listener while we modify the page content
			$('.stream-container').unbind("DOMSubtreeModified");
			//finde elements with no rtc li option
			$('ul.tweet-actions:not(.rtc)').prepend(rtcLiElement);
			//add click Rt+C 
			$('li.rtc').click(clickRtc);
			//add class to ul for mark as option rtc added
			$('ul.tweet-actions:not(.rtc)').addClass('rtc');
			//add tree listener to know when we have to add more rtc li elements
			$('.stream-container').bind("DOMSubtreeModified",treeModifi);
		}
	};

	//public methods
	var public = {
		initPlugin : function () {
			//avoid profile page
			if($('.profile.active').length===0){
				addOption();
			}
		}
	}
	return public;
})();

//execute when load
ExternFunction.initPlugin();

