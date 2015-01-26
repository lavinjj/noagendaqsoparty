angular.module('noagendaqsoparty', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'LocalStorageModule', 'angulartics', 'angulartics.google.analytics']);

angular.module('noagendaqsoparty').config(function ($routeProvider, constants) {

    $routeProvider.when(constants.siteUris.home, {templateUrl: constants.partials.home});
    $routeProvider.when(constants.siteUris.register, {templateUrl: constants.partials.register});
    $routeProvider.when(constants.siteUris.login, {templateUrl: constants.partials.login});
    $routeProvider.when(constants.siteUris.logbook, {templateUrl: constants.partials.logbook});
    $routeProvider.when(constants.siteUris.contestlog, {templateUrl: constants.partials.contestlog});
    $routeProvider.when(constants.siteUris.contestlog + '/:id', {templateUrl: constants.partials.contestlog});
    $routeProvider.when(constants.siteUris.results, {templateUrl: constants.partials.results});
    $routeProvider.when(constants.siteUris.rules, {templateUrl: constants.partials.rules});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo: constants.siteUris.home});

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
    })
    .run(function (contestLogDataService){
        contestLogDataService.init();
    })
    .run(function (qsoRecordDataService){
        qsoRecordDataService.init();
    });

