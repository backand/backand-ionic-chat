angular.module('starter')


  .controller('ChatsCtrl', function (Chats, Backand) {
    var self = this;

    self.create = function (name) {
      Chats.add(name).then(function () {
        self.isCreating = false;
        init();
      });
    };

    self.cancelCreate = function () {
      self.isCreating = false;
    };

    function init() {
      Chats.getAll().then(function (response) {
        self.chats = response.data.data;
      });
    }

    init();
  })

  .controller('ChatDetailCtrl', function ($stateParams, Chats, Backand, Messages, $ionicScrollDelegate) {
    var self = this;

    self.sendMessage = function () {
      Messages.post(self.chat.newMessage, $stateParams.chatId);
      self.chat.newMessage = '';
    };

    function init() {
      $ionicScrollDelegate.scrollBottom(true);
      Backand.on('send_message' + $stateParams.chatId, function (data) {
        self.messages.push(data);
        $ionicScrollDelegate.scrollBottom(true);
      });

      Chats.get($stateParams.chatId).then(function (response) {
        self.chat = response.data;
      });

      Messages.get($stateParams.chatId).then(function (response) {
        self.messages = response.data.data.map(function (item) {
          return item.message;
        });
      });
    }

    init();
  });
