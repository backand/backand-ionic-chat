# backand-ionic-chat
A sample app in Ionic that demonstrates the Real Time feature in Backand

Set up instructions:

1- To run starter, run ionic start on the repository:

    ionic start backand-ionic-chat https://github.com/backand/backand-ionic-chat
    cd backand-ionic-chat

2 - Run with ionic serve command

    ionic serve
	
In order to run the app on another platform (Android/iOS):

	cordova platform add <platform>
	ionic run <platform>

Instructions for setting up your own realtime Backand application:

1 - Create a free personal application at backand.com

2 - Add the following object to your Backand model:
	{
		"name": "chats",
		"fields": {
		  "name": {
			"type": "string"
		  }
		}
	}
	
3 - Add an on demand server action named SendMessage, use the following code inside the function scope:

	socket.emitAll("send_message" + parameters.chatId, parameters);
	
4 - Modify the following code on www/js/app.js with your Backand app name, sign up token and anonymous token:

	BackandProvider.setAppName('ionicchatstarter');
    BackandProvider.setSignUpToken('aa3b4fbb-cfa8-4deb-8ecc-4b737aff9fde');
    BackandProvider.setAnonymousToken('4dbe52c1-0b31-49a2-ab44-39f9b4a095c3');
	
5 - Enjoy your custom Real Time app! You can add whatever functionality you want both to the client or the server!

For more info about Backand Real Time feature:
http://docs.backand.com/en/latest/apidocs/realtime/index.html
