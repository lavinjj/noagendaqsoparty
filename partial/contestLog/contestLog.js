angular.module('noagendaqsoparty').controller('ContestlogCtrl', function ($scope, $controller, $routeParams, localStorageService, constants, events, ContestLog, QsoRecord) {
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
    $scope.qsoData = [];
    $scope.displayDetails = false;

    $scope.toggleDetails = function () {
        $scope.displayDetails = !$scope.displayDetails;
    };

    $scope.addContact = function () {
        if(!$scope.qsoData){
            $scope.qsoData = [];
        }
        var contact = new QsoRecord();
        contact.contestant = $scope.contestLog.contestant;
        contact.contestLog = $scope.contestLog.id;
        contact.callSent = $scope.contestLog.callsign;
        contact.date = moment.utc().format('YYYY-MM-DD');
        contact.time = moment.utc().format('hh:mm:ss');
        if ($scope.qsoData.length) {
            contact.index = $scope.qsoData[$scope.qsoData.length - 1].index + 1;
            contact.frequency = $scope.qsoData[$scope.qsoData.length - 1].frequency;
            contact.mode = $scope.qsoData[$scope.qsoData.length - 1].mode;
            contact.callSent = $scope.qsoData[$scope.qsoData.length - 1].callSent;
            contact.countrySent = $scope.qsoData[$scope.qsoData.length - 1].countrySent;
            contact.provinceSent = $scope.qsoData[$scope.qsoData.length - 1].provinceSent;
            contact.rstSent = $scope.qsoData[$scope.qsoData.length - 1].rstSent;
            contact.exchSent = $scope.qsoData[$scope.qsoData.length - 1].exchSent;
        }
        else {
            contact.index = 1;
        }

        $scope.qsoData.push(contact);
    };

    $scope.updateContestLog = function () {
        if ($scope.contestLog.id === undefined) {
            $scope.publish(events.message._CREATE_CONTEST_LOG_, [$scope.contestLog]);
        } else {
            $scope.publish(events.message._UPDATE_CONTEST_LOG_, [$scope.contestLog]);
        }
    };

    $scope.createContestLogHandler = function(result){
        $scope.contestLog = result;
        localStorageService.set(constants.localStorage.currentContestLog, $scope.contestLog);
    };

    $scope.subscribe(events.message._CREATE_CONTEST_LOG_COMPLETE_, $scope.createContestLogHandler);

    $scope.updateContestLogHandler = function(result){
        $scope.contestLog = result;
        localStorageService.set(constants.localStorage.currentContestLog, $scope.contestLog);
        $scope.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_, [$scope.contestLog.id]);
    };

    $scope.subscribe(events.message._UPDATE_CONTEST_LOG_COMPLETE_, $scope.updateContestLogHandler);

    $scope.retrieveContestLogByIdHandler = function(result){
        $scope.contestLog = result;
        localStorageService.set(constants.localStorage.currentContestLog, $scope.contestLog);
        $scope.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_, [$scope.contestLog.id]);
    };

    $scope.subscribe(events.message._GET_CONTEST_LOG_BY_ID_COMPLETE_, $scope.retrieveContestLogByIdHandler);

    $scope.retrieveQsoRecordsByContestLogIdHandler = function(result){
        $scope.qsoData = result;
        localStorageService.set(constants.localStorage.currentContestLogQsoData, $scope.qsoData);
    };

    $scope.subscribe(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_COMPLETE_, $scope.retrieveQsoRecordsByContestLogIdHandler);

    $scope.retrieveUserCompletedHandler = function (user) {
        $scope.traceInfo("retrieveUserCompletedHandler received: " + angular.toJson(user));
        if (user) {
            $scope.contestant = user;
            $scope.contestLog.contestant = $scope.contestant.id;
            $scope.contestLog.callsign = $scope.contestant.UserName;
            $scope.contestLog.name = $scope.contestant.FirstName + ' ' + $scope.contestant.LastName;
            $scope.contestLog.emailAddress = $scope.contestant.Email;
        }
    };
    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.retrieveUserCompletedHandler);

    $scope.updateQsoRecord = function(index){
        var record = $scope.qsoData[index];
        if(record.id === undefined){
            $scope.publish(events.message._CREATE_QSO_RECORD_, [record]);
        }else {
            $scope.publish(events.message._UPDATE_QSO_RECORD_, [record]);
        }
    };

    $scope.createQsoRecordHandler = function(record){
        for(var i = 0; i < $scope.qsoData.length; i++){
            if($scope.qsoData[i].index === record.index){
                $scope.qsoData[i] = record;
                break;
            }
        }
        localStorageService.set(constants.localStorage.currentContestLogQsoData, $scope.qsoData);
    };

    $scope.subscribe(events.message._CREATE_QSO_RECORD_COMPLETE_, $scope.createQsoRecordHandler);

    $scope.updateQsoRecordHandler = function(record){
        for(var i = 0; i < $scope.qsoData.length; i++){
            if($scope.qsoData[i].id === record.id){
                $scope.qsoData[i] = record;
                break;
            }
        }
        localStorageService.set(constants.localStorage.currentContestLogQsoData, $scope.qsoData);
    };

    $scope.subscribe(events.message._UPDATE_QSO_RECORD_COMPLETE_, $scope.updateQsoRecordHandler);

    $scope.deleteQsoRecord = function(index){
        var record = $scope.qsoData[index];
        if(record.id === undefined){
            $scope.qsoData.splice(index, 1);
            localStorageService.set(constants.localStorage.currentContestLogQsoData, $scope.qsoData);
        }else {
            $scope.publish(events.message._DELETE_QSO_RECORD_, [record]);
        }
    };

    $scope.deleteQsoRecordHandler = function(){
        $scope.publish(events.message._GET_QSO_RECORDS_BY_CONTEST_LOG_ID_, [$scope.contestLog.id]);
    };

    $scope.subscribe(events.message._DELETE_QSO_RECORD_COMPLETE_, $scope.deleteQsoRecordHandler);

    $scope.init = function () {
        if($routeParams.id !== undefined){
            localStorageService.remove(constants.localStorage.currentContestLog);
            localStorageService.remove(constants.localStorage.currentContestLogQsoData);
            $scope.publish(events.message._GET_CONTEST_LOG_BY_ID_, [$routeParams.id]);
        } else {
            var contestLog = localStorageService.get(constants.localStorage.currentContestLog);
            if (!contestLog) {
                $scope.contestLog = new ContestLog();
                $scope.contestLog.contestName = 'noagendaqsoparty2015';
                $scope.contestLog.submitTime = moment.utc().format('YYYY-MM-DD hh:mm:ss');
                $scope.qsoData = [];
            } else {
                $scope.contestLog = contestLog;
                $scope.qsoData = localStorageService.get(constants.localStorage.currentContestLogQsoData);
            }
        }
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
    };

    $scope.init();


});
