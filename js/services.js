angular.module('starter')

  .service('Chats', function(Backand) {
    var self = this,
        objectName = 'chats';

    self.getAll = function() {
      var params ={
        sort: Backand.helpers.sort.create('id', Backand.helpers.sort.orders.desc)
      };
      return Backand.object.getList(objectName, params);
    };

    self.get = function(id) {
      return Backand.object.getOne(objectName,id);
    };

    self.add = function (name) {
      return Backand.object.create(objectName, {name: name});
    };
  })

  .service('Messages', function (Backand) {
    var self = this,
        objectName = 'messages';

    // Triggers the SendMessage action on the Backand app
    self.post = function (message, chatId) {
      return Backand.object.create(objectName, {message: message, chat: chatId});
    };

    // Uses pagination to get the last 5 messages
    // Uses filter to get only our current chat's messages
    self.get = function (chatId) {

      var params = {
        sort: Backand.helpers.sort.create('id', Backand.helpers.sort.orders.desc),
        exclude: Backand.helpers.exclude.options.all,
        filter: Backand.helpers.filter.create('chat', Backand.helpers.filter.operators.relation.in, chatId),
        pageSize: 5,
        pageNumber: 1
      };

      return Backand.object.getList(objectName, params);
    };
  });
