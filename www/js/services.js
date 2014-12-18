angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

 .factory('Box', ['$http', function($http){
    return {
      getItems: function(callback){
        $http.get('http://localhost:5000/items')
          .success(function(data) {
            console.log(data);
            callback(data);
        });
      }
    };
  }])

.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' },
  { id: 4, name: 'Nati'},
{ id: 5, name: 'Name'}
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});