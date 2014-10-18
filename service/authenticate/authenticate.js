angular.module('noagendaqsoparty').factory('authenticate', function (messaging, events, sha) {
  var currentUser = {};
  var currentPassword = '';

  var login = function (username, password) {
    currentPassword = password;
    messaging.publish(events.message._GET_BREWER_BY_USERNAME_, [username]);
  };

  messaging.subscribe(events.message._AUTHENTICATE_USER_, login);

  var onGetContestantByUserNameComplete = function (contestants) {
    var contestant = contestants[0];
    var passwordHash = sha.hash(currentPassword + Date.parse(contestant.DateJoined).valueOf().toString());

    if (passwordHash !== contestant.Password) {
      messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Invalid password', 'alert.warning']);
      return;
    }

    currentUser = contestant;

    messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [currentUser]);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_COMPLETE_, onGetContestantByUserNameComplete);

  var authenticationFailureHandler = function () {
    messaging.publish(events.message._AUTHENTICATE_USER_FAILED_);
    messaging.publish(events.message._SERVER_REQUEST_ENDED_);
    messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Log In Failed.', 'alert-warning']);
  };

  messaging.subscribe(events.message._GET_BREWER_BY_USERNAME_FAILED_, authenticationFailureHandler);

  var currentUserHandler = function () {
    messaging.publish(events.message._CURRENT_USER_RESPONSE_, [currentUser]);
  };

  messaging.subscribe(events.message._REQUEST_CURRENT_USER_, currentUserHandler);

  var init = function () {
    currentUser = {};
  };

  var authenticate = {
    init: init
  };

  return authenticate;
});
