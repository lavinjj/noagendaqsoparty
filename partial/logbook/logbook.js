angular.module('noagendaqsoparty').controller('LogbookCtrl', function ($scope, $controller, $location, events, constants, localStorageService) {
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.contestant = null;
    $scope.contestLogs = [];

    //#region message handlers
    $scope.retrieveUserCompletedHandler = function (user) {
        if (user) {
            $scope.contestant = user;
            $scope.traceInfo("retrieveUserCompletedHandler received: " + angular.toJson(user));
            $scope.publish(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_, [$scope.contestant.id]);
        }
    };

    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.retrieveUserCompletedHandler);

    $scope.retrieveContestLogsByContestantIdHandler = function (result) {
        if(result){
            $scope.contestLogs = result;
        } else {
            $scope.contestLogs = [];
        }
        $scope.traceInfo("retrieveContestLogsByContestantIdHandler received: " + angular.toJson(result));
    };

    $scope.subscribe(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_COMPLETE_, $scope.retrieveContestLogsByContestantIdHandler);

    $scope.deleteContestLogHandler = function () {
        $scope.publish(events.message._GET_CONTEST_LOGS_BY_CONTESTANT_ID_, [$scope.contestant.id]);
    };

    $scope.subscribe(events.message._DELETE_CONTEST_LOG_COMPLETE_, $scope.deleteContestLogHandler);

    $scope.getQsoRecordsByContestLogIdHandler = function (result) {
        angular.forEach(result, function (record) {
            $scope.publish(events.message._DELETE_QSO_RECORD_, [record]);
        });
    };

    $scope.subscribe(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_COMPLETE_, $scope.getQsoRecordsByContestLogIdHandler);
    //#endregion

    //#region click handlers
    $scope.createLog = function () {
        $location.path(constants.siteUris.contestlog);
    };

    $scope.editLog = function (id) {
        $location.path(constants.siteUris.contestlog + '/' + id);
    };

    $scope.deleteLog = function (index) {
        var log = $scope.contestLogs[index];
        $scope.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_, [log.id]);
        $scope.publish(events.message._DELETE_CONTEST_LOG_, [log]);
    };

    $scope.uploadLog = function(){
        window.alert('Not functional at this time.');
    };
    //#endregion

    $scope.init = function () {
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
        localStorageService.remove(constants.localStorage.currentContestLog);
        localStorageService.remove(constants.localStorage.currentContestLogQsoData);
    };

    $scope.init();

});
