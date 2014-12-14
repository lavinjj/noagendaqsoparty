angular.module('noagendaqsoparty').controller('ContestlogCtrl', function ($scope, localStorageService, constants, ContestLog, QsoRecord) {

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
    $scope.contestLog = new ContestLog();

    $scope.addContact = function () {
        var contact = new QsoRecord();
        contact.contestant = $scope.contestLog.contestant;
        contact.callSent = $scope.contestLog.callsign;
        contact.date = moment.utc().format('YYYY-MM-DD');
        contact.time = moment.utc().format('hh:mm:ss');
        if ($scope.contestLog.qsoData.length) {
            contact.index = $scope.contestLog.qsoData[$scope.contestLog.qsoData.length - 1].index + 1;
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

    $scope.init = function () {
        var contestLog = localStorageService.get(constants.localStorage.currentContestLog);
        if(!contestLog){
            $scope.contestLog = new ContestLog();
            $scope.contestLog.contestName = 'noagendaqsoparty2015';
            $scope.contestLog.qsoData = [];
        } else {
            $scope.contestLog = contestLog;
        }
    };

    $scope.init();


});
