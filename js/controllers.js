angular.module('starter')


  .controller('ChatsCtrl', function (Chats) {
    var self = this;

    // Add chat and refresh the list
    self.create = function (name) {
      Chats.add(name).then(function () {
        self.isCreating = false;
        init();
      });
    };

    self.cancelCreate = function () {
      self.isCreating = false;
    };

    // Load the chats from the server
    function init() {
      Chats.getAll().then(function (response) {
        self.chats = response.data;
      });
    }

    init();
  })

  .controller('ChatDetailCtrl', function ($stateParams, Chats, Backand, Messages, $ionicScrollDelegate) {
    var self = this;

    // Send a message - POST request to the server
    // After the message is added in the server's db, it triggers an action that dispatches the real time event to the clients
    // The action is configured in the Backand app
    self.sendMessage = function () {
      Messages.post(self.chat.newMessage, $stateParams.chatId);
      self.chat.newMessage = '';
    };

    // Get the latest messages from the server
    self.getMessages = function(){
      Messages.get($stateParams.chatId).then(function (response) {
        self.messages = response.data.map(function (item) {
          return item.message;
        });
      });
    }

    function init() {
      // Scroll chats to bottom so the user can see the latest messages
      $ionicScrollDelegate.scrollBottom(true);

      // Listen to real time events for the current chat, and when the event triggers run the callback that adds a new message
      // For more info about real time events in Backand: http://docs.backand.com/en/latest/apidocs/realtime/index.html
      Backand.on('send_message' + $stateParams.chatId, function (data) {
        self.getMessages();
        //$ionicScrollDelegate.scrollBottom(true);
      });

      // Get the chat from the server to get its metadata
      Chats.get($stateParams.chatId).then(function (response) {
        self.chat = response.data;
      });

      self.getMessages();

    }

    init();
  });
