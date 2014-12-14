var QsoRecord = function () {
    var contestant = '';
    var index = 0;
    var frequency = '';
    var mode = '';
    var date = '';
    var time = '';
    var callSent = '';
    var rstSent = '';
    var exchSent = '';
    var callRcvd = '';
    var rstRcvd = '';
    var exchRcvd = '';
};

angular.module('noagendaqsoparty').value('QsoRecord', QsoRecord);
