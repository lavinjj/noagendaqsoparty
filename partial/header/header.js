angular.module('noagendaqsoparty').controller('HeaderCtrl', function ($scope, $controller, $location, events, constants) {
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.contestant = null;

    //#region message handlers
    $scope.retrieveUserCompletedHandler = function (user) {
        if (user) {
            $scope.contestant = user;
            $scope.userAuthenticated = true;
            $scope.traceInfo("retrieveUserCompletedHandler received: " + angular.toJson(user));
        }
    };

    $scope.subscribe(events.message._AUTHENTICATE_USER_COMPLETE_, $scope.retrieveUserCompletedHandler);
    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.retrieveUserCompletedHandler);
    //#endregion

    $scope.logoutUser = function(){
        $scope.contestant = null;
        $scope.publish(events.message._LOGOUT_USER_);
        $location.path(constants.siteUris.home);
    };

    $scope.init = function(){
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
    };

    $scope.init();
});
