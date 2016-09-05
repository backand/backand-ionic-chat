angular.module('starter')

.service('Chats', function($http, Backand) {
  var self = this;

  self.getAll = function() {
    return $http({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/objects/chats',
      params: {
        pageSize: 20,
        pageNumber: 1,
        filter: [],
        sort: ''
      }
    });
  };
  self.get = function(id) {
    return $http({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/objects/chats',
      params: {
        id: id
      }
    });
  };

  self.add = function (name) {
    return $http({
      method: 'POST',
      url: Backand.getApiUrl() + '/1/objects/chats',
      data: {
        name: name
      }
    });
  }
})
.service('Messages', function ($http, Backand) {
    var self = this;

    // Triggers the SendMessage action on the Backand app
    self.post = function (message, chatId) {
      return $http ({
        method: 'POST',
        url: Backand.getApiUrl() + '/1/objects/messages',
        data: {
          message: message,
          chat: chatId
        }
      });
    };

    // Uses pagination to get the last 5 messages
    // Uses filter to get only our current chat's messages
    self.get = function (chatId) {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/messages',
        params: {
          pageSize: 5,
          pageNumber: 1,
          filter: [
            {
              fieldName: 'chat',
              operator: 'in',
              value: chatId
            }
          ],
          sort: '[{fieldName:\'id\', order:\'desc\'}]'
        }
      });
    };
  });
