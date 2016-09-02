angular.module('starter')

.service('Chats', function($http, Backand) {
  // Might use a resource here that returns a JSON array
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
  }
})
.service('Messages', function ($http, Backand) {
    var self = this;
    self.post = function (message, chatId) {
      return $http ({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/action/messages/1',
        params: {
          name: 'SendMessage',
          parameters: {
            chatId: chatId,
            message: message
          }
        },
        config: {
          ignoreError: true
        }
      });
    }
  });
