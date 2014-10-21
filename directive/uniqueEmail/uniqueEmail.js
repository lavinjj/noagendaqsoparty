angular.module('noagendaqsoparty').directive('uniqueEmail', function (constants, mongolab) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      var getContestantByEmailSuccessHandler = function (response) {
        if(response.data && response.data.length > 0){
          ctrl.$setValidity('uniqueEmail', false);
        }
        else{
          ctrl.$setValidity('uniqueEmail', true);
        }
      };

      var getContestantByEmailErrorHandler = function () {
        ctrl.$setValidity('uniqueEmail', true);
      };

      ctrl.$parsers.unshift(function (viewValue) {
        // do nothing unless we match a valid email address
        if ((viewValue !== null) && (viewValue !== undefined) && (viewValue !== '') && (null !== viewValue.match(/.*@.*\..{2}/))) {
          mongolab.query(constants.db.dbName, constants.db.contestantCollection, {q: {Email: viewValue}})
            .then(getContestantByEmailSuccessHandler, getContestantByEmailErrorHandler);
        }

        return viewValue;
      });
    }
  };
});