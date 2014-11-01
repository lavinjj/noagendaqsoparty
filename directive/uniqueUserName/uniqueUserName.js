angular.module('noagendaqsoparty').directive('uniqueUserName', function(constants, mongolab) {
	return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var getContestantByUserNameSuccessHandler = function (response) {
        if(response.data && response.data.length > 0) {
          ctrl.$setValidity('uniqueUserName', false);
        }
        else{
          ctrl.$setValidity('uniqueUserName', true);
        }
      };

      var getContestantByUserNameErrorHandler = function () {
        ctrl.$setValidity('uniqueUserName', true);
      };

      ctrl.$parsers.unshift(function (viewValue) {
        // do nothing unless we match a valid email address
        if ((viewValue !== null) && (viewValue !== undefined) && (viewValue !== '')) {
          mongolab.query(constants.db.dbName, constants.db.contestantCollection, {q: {UserName: viewValue.toUpperCase()}})
            .then(getContestantByUserNameSuccessHandler, getContestantByUserNameErrorHandler);
        }

        return viewValue;
      });
    }
	};
});