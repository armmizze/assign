angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $stateParams, Friends, Box) {
  // window.location.href = "http://localhost:5000/login.html";
  $scope.friend = Friends.get($stateParams.friendId);

  Box.getItems(function(data){
    console.log(data);
    $scope.boxs = data;
  });

})

.controller('BoxsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('BoxDetailCtrl', function($scope, $stateParams, Friends, Box) {
  $scope.friend = Friends.get($stateParams.friendId);

  Box.getItems(function(data){
    console.log(data);
    $scope.boxs = data;
  });

})

.controller('AccountCtrl', function($scope) {
});
