angular.module('noagendaqsoparty').controller('HeaderCtrl',function($scope, $controller, events){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  $scope.contestant = null;

  //#region message handlers
  $scope.authenticateUserCompletedHandler = function(user) {
    if(user)
    {
      $scope.contestant = user;
      $scope.userAuthenticated = true;
      $scope.traceInfo("authenticateUserCompletedHandler received: " + angular.toJson(user));
    }
  };

  $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.authenticateUserCompletedHandler);
  //#endregion

});