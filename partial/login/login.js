angular.module('noagendaqsoparty').controller('LoginCtrl',function($scope, $controller, $location, events){
  // this call to $controller adds the base controller's methods
  // and properties to the controller's scope
  $controller('BaseCtrl', {$scope: $scope});

  //#region Internal models
  $scope.username = '';
  $scope.password = '';
  $scope.currentUser = {};
  $scope.userAuthenticated = false;
  //#endregion

  //#region message handlers
  $scope.authenticateUserCompletedHandler = function(user) {
    if(user)
    {
      $scope.currentUser = user;
      $scope.userAuthenticated = true;
      $scope.traceInfo("authenticateUserCompletedHandler received: " + angular.toJson(user));
      $location.path('/logbook');
    }
  };

  $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.authenticateUserCompletedHandler);
  //#endregion

  //#region click handlers
  $scope.login = function() {
    $scope.traceInfo("authenticateUserCompletedHandler authenticating user: " + $scope.username);
    $scope.publish(events.message._AUTHENTICATE_USER_, [$scope.username.toUpperCase(), $scope.password]);
  };
  //#endregion

});