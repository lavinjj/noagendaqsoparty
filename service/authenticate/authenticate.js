angular.module('noagendaqsoparty').factory('authenticate', function (localStorageService, constants, messaging, events, sha) {
    var currentUser = null;
    var currentPassword = '';

    var login = function (username, password) {
        currentPassword = password;
        messaging.publish(events.message._GET_CONTESTANT_BY_USERNAME_, [username]);
    };

    messaging.subscribe(events.message._AUTHENTICATE_USER_, login);

    var logout = function(){
        localStorageService.remove(constants.localStorage.currentUser);
        currentUser = null;
        messaging.publish(events.message._CURRENT_USER_RESPONSE_, [currentUser]);
        messaging.publish(events.message._LOGOUT_USER_COMPLETE_, [currentUser]);
    };

    messaging.subscribe(events.message._LOGOUT_USER_, logout);

    var onGetContestantByUserNameComplete = function (contestants) {
        var contestant = contestants[0];
        var passwordHash = sha.hash(currentPassword + Date.parse(contestant.dateJoined).valueOf().toString());

        if (passwordHash !== contestant.password) {
            messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Invalid password', 'alert.warning']);
            return;
        }

        currentUser = contestant;
        localStorageService.set(constants.localStorage.currentUser, currentUser);

        messaging.publish(events.message._AUTHENTICATE_USER_COMPLETE_, [currentUser]);
    };

    messaging.subscribe(events.message._GET_CONTESTANT_BY_USERNAME_COMPLETE_, onGetContestantByUserNameComplete);

    var authenticationFailureHandler = function () {
        messaging.publish(events.message._AUTHENTICATE_USER_FAILED_);
        messaging.publish(events.message._SERVER_REQUEST_ENDED_);
        messaging.publish(events.message._ADD_ERROR_MESSAGE_, ['Log In Failed.', 'alert-warning']);
    };

    messaging.subscribe(events.message._GET_CONTESTANT_BY_USERNAME_FAILED_, authenticationFailureHandler);

    var currentUserHandler = function () {
        if(!currentUser){
            currentUser = localStorageService.get(constants.localStorage.currentUser);
        }
        messaging.publish(events.message._CURRENT_USER_RESPONSE_, [currentUser]);
    };

    messaging.subscribe(events.message._REQUEST_CURRENT_USER_, currentUserHandler);

    var init = function () {
        currentUser = null;
    };

    var authenticate = {
        init: init
    };

    return authenticate;
});
