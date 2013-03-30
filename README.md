rtc
===

Chrome plugin to allow retweet with comment in twitter web page


Chrome plugin page: https://developer.chrome.com/extensions/
Page where plugin applies: https://twitter.com/

How it works:
 1 - Add listener to https://twitter.com with "chrome.webNavigation.onCompleted.addListener" to start to run the plugin

 2 - Add li item "Rt+C" equal to the other actions "Reply, Retweet"

 3 - Add click function to "Rt+C" item

 4 - Show new tweet modal calling "click" function on "new tweet" button

 5 - Modify "new tweet" modal view:
	  - Add tweet content to "retweet with comment" in text editor of "new tweet" modal view
	  - Change title

 6 - Restore "new tweet" modal view adding a click function over new tweet button:
      - Restore class and value (orignal saved)
      - Remove possible text in text editor of "new tweet" modal view