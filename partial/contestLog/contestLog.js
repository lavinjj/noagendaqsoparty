angular.module('noagendaqsoparty').controller('ContestlogCtrl', function ($scope, $controller, localStorageService, constants, events, ContestLog, QsoRecord) {
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.categoryAssisted = ['ASSISTED', 'NON-ASSISTED'];
    $scope.categoryBand = ['ALL', '160M', '80M', '40M', '20M', '15M', '10M', '6M', '2M',
        '222', '432', '902', '1.2G', '2.3G', '3.4G', '5.7G', '10G', '24G', '47G', '75G',
        '119G', '142G', '241G', 'Light'];
    $scope.categoryMode = ['SSB', 'CW', 'RTTY', 'MIXED', 'D-Star', 'EchoLink'];
    $scope.categoryOperator = ['SINGLE-OP', 'MULTI-OP', 'CHECKLOG'];
    $scope.categoryPower = ['HIGH', 'LOW', 'QRP'];
    $scope.categoryStation = ['FIXED', 'MOBILE', 'PORTABLE', 'ROVER',
        'EXPEDITION', 'HQ', 'SCHOOL'];
    $scope.categoryTime = ['6-HOURS', '12-HOURS', '24-HOURS'];
    $scope.categoryTransmitter = ['ONE', 'TWO', 'LIMITED', 'UNLIMITED', 'SWL'];
    $scope.categoryOverlay = ['CLASSIC', 'ROOKIE', 'TB-WIRES', 'NOVICE-TECH', 'OVER-50'];
    $scope.contestant = null;
    $scope.contestLog = new ContestLog();
    $scope.displayDetails = false;

    $scope.toggleDetails = function(){
        $scope.displayDetails = !$scope.displayDetails;
    };

    $scope.addContact = function () {
        var contact = new QsoRecord();
        contact.contestant = $scope.contestLog.contestant;
        contact.callSent = $scope.contestLog.callsign;
        contact.date = moment.utc().format('YYYY-MM-DD');
        contact.time = moment.utc().format('hh:mm:ss');
        if ($scope.contestLog.qsoData.length) {
            contact.index = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].index + 1;
            contact.frequency = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].frequency;
            contact.mode = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].mode;
            contact.callSent = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].callSent;
            contact.countrySent = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].countrySent;
            contact.provinceSent = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].provinceSent;
            contact.rstSent = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].rstSent;
            contact.exchSent = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].exchSent;
        }
        else {
            contact.index = 1;
        }

        $scope.contestLog.qsoData.push(contact);
    };

    $scope.updateLog = function(){
        if($scope.contestLog){
            localStorageService.set(constants.localStorage.currentContestLog, $scope.contestLog);
        }
    };

    $scope.retrieveUserCompletedHandler = function (user) {
        $scope.traceInfo("retrieveUserCompletedHandler received: " + angular.toJson(user));
        if (user) {
            $scope.contestant = user;
            $scope.contestLog.contestant = $scope.contestant._id.$oid;
            $scope.contestLog.callsign = $scope.contestant.UserName;
            $scope.contestLog.name = $scope.contestant.FirstName + ' ' + $scope.contestant.LastName;
            $scope.contestLog.emailAddress = $scope.contestant.Email;
        }
    };
    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.retrieveUserCompletedHandler);

    $scope.init = function () {
        var contestLog = localStorageService.get(constants.localStorage.currentContestLog);
        if(!contestLog){
            $scope.contestLog = new ContestLog();
            $scope.contestLog.contestName = 'noagendaqsoparty2015';
            $scope.contestLog.qsoData = [];
        } else {
            $scope.contestLog = contestLog;
        }
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
    };

    $scope.init();


});
