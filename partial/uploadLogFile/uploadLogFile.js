angular.module('noagendaqsoparty').controller('UploadlogfileCtrl',function($scope, $controller, $location, constants, events, ContestLog, QsoRecord){
    // this call to $controller adds the base controller's methods
    // and properties to the controller's scope
    $controller('BaseCtrl', {$scope: $scope});

    $scope.contestant = null;
    $scope.contestLog = new ContestLog();
    $scope.qsoData = [];
    $scope.readMethod = "readAsText";
    $scope.readStatus = '';

    $scope.retrieveUserCompletedHandler = function (user) {
        $scope.traceInfo("retrieveUserCompletedHandler received: " + angular.toJson(user));
        if (user) {
            $scope.contestant = user;
        }
    };
    $scope.subscribe(events.message._CURRENT_USER_RESPONSE_, $scope.retrieveUserCompletedHandler);


    $scope.onRead = function( e, file ){
        var lines  = e.target.result.split('\n');

        $scope.readStatus = 'File read, lines read: ' + lines.length + '<br/>';

        $scope.contestLog = new ContestLog();
        $scope.contestLog.contestant = $scope.contestant.id;
        $scope.contestLog.callsign = $scope.contestant.UserName;
        $scope.contestLog.name = $scope.contestant.FirstName + ' ' + $scope.contestant.LastName;
        $scope.contestLog.emailAddress = $scope.contestant.Email;
        $scope.contestLog.contestName = 'noagendaqsoparty2015';
        $scope.contestLog.submitTime = moment.utc().format('YYYY-MM-DD hh:mm:ss');
        $scope.contestLog.operators = [];
        $scope.contestLog.soapbox = '';
        $scope.qsoData = [];

        for(var i = 0; i < lines.length; i++){
            var line = lines[i].split(':');
            switch(line[0]){
                case 'CALLSIGN':
                    $scope.contestLog.callsign = line[1].trim();
                    $scope.readStatus += 'Parsing CALLSIGN.<br/>';
                    break;
                case 'CONTEST':
                    $scope.contestLog.contestName = line[1].trim();
                    $scope.readStatus += 'Parsing CONTEST.<br/>';
                    break;
                case 'CATEGORY-OPERATOR':
                    $scope.contestLog.categoryOperator = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-OPERATOR.<br/>';
                    break;
                case 'CATEGORY-ASSISTED':
                    $scope.contestLog.assistedStatus = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-ASSISTED.<br/>';
                    break;
                case 'CATEGORY-BAND':
                    $scope.contestLog.categoryBand = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-BAND.<br/>';
                    break;
                case 'CATEGORY-POWER':
                    $scope.contestLog.categoryPower = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-POWER.<br/>';
                    break;
                case 'CATEGORY-MODE':
                    $scope.contestLog.categoryMode = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-MODE.<br/>';
                    break;
                case 'CATEGORY-TRANSMITTER':
                    $scope.contestLog.categoryTransmitter = line[1].trim();
                    $scope.readStatus += 'Parsing CATEGORY-TRANSMITTER.<br/>';
                    break;
                case 'CLAIMED-SCORE':
                    $scope.contestLog.claimedScore = line[1].trim();
                    $scope.readStatus += 'Parsing CLAIMED-SCORE.<br/>';
                    break;
                case 'CLUB':
                    $scope.contestLog.club = line[1].trim();
                    $scope.readStatus += 'Parsing CLUB.<br/>';
                    break;
                case 'LOCATION':
                    $scope.contestLog.location = line[1].trim();
                    $scope.readStatus += 'Parsing NAME.<br/>';
                    break;
                case 'NAME':
                    $scope.contestLog.name = line[1].trim();
                    $scope.readStatus += 'Parsing .<br/>';
                    break;
                case 'ADDRESS':
                    $scope.contestLog.address = line[1].trim();
                    $scope.readStatus += 'Parsing ADDRESS.<br/>';
                    break;
                case 'ADDRESS-CITY':
                    $scope.contestLog.city = line[1].trim();
                    $scope.readStatus += 'Parsing ADDRESS-CITY.<br/>';
                    break;
                case 'ADDRESS-STATE-PROVINCE':
                    $scope.contestLog.stateProvince = line[1].trim();
                    $scope.readStatus += 'Parsing ADDRESS-STATE-PROVINCE.<br/>';
                    break;
                case 'ADDRESS-POSTALCODE':
                    $scope.contestLog.postalCode = line[1].trim();
                    $scope.readStatus += 'Parsing ADDRESS-POSTALCODE.<br/>';
                    break;
                case 'ADDRESS-COUNTRY':
                    $scope.contestLog.country = line[1].trim();
                    $scope.readStatus += 'Parsing ADDRESS-COUNTRY.<br/>';
                    break;
                case 'OPERATORS':
                    $scope.contestLog.operators.push(line[1].trim());
                    $scope.readStatus += 'Parsing OPERATORS.<br/>';
                    break;
                case 'SOAPBOX':
                    $scope.contestLog.soapbox += line[1].trim();
                    $scope.readStatus += 'Parsing SOAPBOX.<br/>';
                    break;
                case 'QSO':
                    $scope.readStatus += 'Parsing QSO Entry.<br/>';
                    var entries = line[1].trim().split(' ');
                    var values = [];
                    for(var j = 0; j < entries.length; j++){
                        if(entries[j] !== ''){
                            values.push(entries[j]);
                        }
                    }
                    var contact = new QsoRecord();
                    contact.frequency = values[0];
                    contact.mode = values[1];
                    contact.date = values[2];
                    contact.time = values[3];
                    contact.callSent = values[4];
                    contact.rstSent = values[5];
                    contact.exchSent = values[6];
                    contact.callRcvd = values[7];
                    contact.rstRcvd = values[8];
                    contact.exchRcvd = values[9];
                    $scope.qsoData.push(contact);
                    break;
            }
        }

        $scope.publish(events.message._CREATE_CONTEST_LOG_, [$scope.contestLog]);
        $scope.readStatus += 'Uploading Contest Log.<br/>';
    };

    $scope.createContestLogHandler = function(result){
        $scope.contestLog = result;
        $scope.readStatus += 'Contest Log Uploaded.<br/>';

        for(var i = 0; i < $scope.qsoData.length; i++){
            $scope.qsoData[i].contestant = $scope.contestant.id;
            $scope.qsoData[i].contestLog = $scope.contestLog.id;
            $scope.qsoData[i].index = i + 1;
            $scope.publish(events.message._CREATE_QSO_RECORD_, [$scope.qsoData[i]]);
            $scope.readStatus += 'Uploading QSO Record:' + $scope.qsoData[i].index + '<br/>';
        }

        $location.path(constants.siteUris.logbook);
    };

    $scope.subscribe(events.message._CREATE_CONTEST_LOG_COMPLETE_, $scope.createContestLogHandler);


    $scope.init = function () {
        $scope.publish(events.message._REQUEST_CURRENT_USER_);
    };

    $scope.init();

});
