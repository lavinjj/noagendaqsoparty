angular.module('noagendaqsoparty', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'LocalStorageModule', 'angulartics', 'angulartics.google.analytics']);

angular.module('noagendaqsoparty').config(function ($routeProvider) {

    $routeProvider.when('/', {templateUrl: 'partial/home/home.html'});
    $routeProvider.when('/register', {templateUrl: 'partial/register/register.html'});
    $routeProvider.when('/login', {templateUrl: 'partial/login/login.html'});
    $routeProvider.when('/logbook', {templateUrl: 'partial/logbook/logbook.html'});
    $routeProvider.when('/contestlog', {templateUrl: 'partial/contestLog/contestLog.html'});
    $routeProvider.when('/results', {templateUrl: 'partial/results/results.html'});
    $routeProvider.when('/rules', {templateUrl: 'partial/rules/rules.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo: '/'});

})
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('NoAgendaQSOParty');
    })
    .run(function ($rootScope) {

        $rootScope.safeApply = function (fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

    })
    .run(function (logging) {
        logging.init('main');
        logging.setLogLevel(log4javascript.Level.ALL);
        logging.setLogAppender(new log4javascript.BrowserConsoleAppender());
    })
    .run(function (mongolab) {
        mongolab.setApiKey('uBNL_OFgaJ77eIEA0ZLFmwFcvuVLVv0o');
    })
    .run(function (contestantDataService) {
        contestantDataService.init();
    })
    .run(function (dialog) {
        dialog.init();
    })
    .run(function (errors) {
        errors.init();
    })
    .run(function (notification) {
        notification.init();
    })
    .run(function (authenticate) {
        authenticate.init();
    });

