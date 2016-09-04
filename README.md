# backand-ionic-chat
A sample app in Ionic that demonstrates the Real Time feature in Backand

Set up instructions:

1- To run starter, run ionic start on the repository:

    ionic start backand-chat-starter https://github.com/backand/backand-chat-starter
    cd backand-chat-starter

2 - Run with ionic serve function

    ionic serve
	
In order to run the app on another platform (Android/iOS):

	cordova platform add <platform>
	ionic run <platform>

Instructions for setting up your own realtime Backand application:

1 - Create a free personal application at backand.com

2 - Set the following Backand DB model:
    
    [
      {
        "name": "users",
        "fields": {
          "email": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "chats": {
            "object": "chats"
          }
        }
      },
      {
        "name": "chats",
        "fields": {
          "participants": {
            "collection": "users",
            "via": "chats"
          },
          "messages": {
            "collection": "messages",
            "via": "chat"
          },
          "name": {
            "type": "string"
          }
        }
      },
      {
        "name": "messages",
        "fields": {
          "message": {
            "type": "string"
          },
          "chat": {
            "object": "chats"
          }
        }
      }
    ]
	
3 - On the messages object, add a server side action that triggers after the create event. Call it SendMessage and use the following code:

    'use strict';
    function backandCallback(userInput, dbRow, parameters, userProfile) {
        socket.emitAll("send_message" + userInput.chat, userInput.message);
      return {};
    }
	
4 - Modify the following code on www/js/app.js with your Backand app name, sign up token and anonymous token:

      BackandProvider.setAppName('Your-App-Name');
      
      BackandProvider.setSignUpToken('Your-SignUp-Token');
      
      BackandProvider.setAnonymousToken('Your-Anonymous-Token');
	
5 - Enjoy your custom Real Time app! You can add whatever functionality you want both to the client or the server!

For more info about Backand Real Time feature:
http://docs.backand.com/en/latest/apidocs/realtime/index.html
