var QsoRecord = function () {
    var contestant = '';
    var contestLog = '';
    var index = 0;
    var frequency = '';
    var mode = '';
    var date = '';
    var time = '';
    var callSent = '';
    var countrySent = '';
    var provinceSent = '';
    var rstSent = '';
    var exchSent = '';
    var callRcvd = '';
    var countryRcvd = '';
    var provinceRcvd = '';
    var rstRcvd = '';
    var exchRcvd = '';
};

angular.module('noagendaqsoparty').value('QsoRecord', QsoRecord);
