angular.module('App.service', [])
.factory('Armoires', ['$http',
function($http) 
{
         return {
           addItem: function(user, pass, callback) {
                var tmp = {
                    user: user,
                    pass: pass
                    
                };
                $http.get('add/', {
                    params: tmp
                }).success(function(data) {
                    
                    callback(data);
                }).
                error(function(data) {
                    callback({
                        error: 1
                    });
                });
            },
      
            check: function(user, pass, callback) {
                var tmp = {
                    user: user,
                    pass: pass,
                    
                };
                $http.get('check/', {
                    params: tmp
                }).success(function(data) {
                    callback(data);
                }).
                error(function(data) {
                    callback({
                        error: 1
                    });
                });
               
            }
         }
     }
]);