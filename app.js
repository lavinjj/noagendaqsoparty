angular.module('noagendaqsoparty', ['ui.bootstrap','ui.utils','ngRoute','ngAnimate']);

angular.module('noagendaqsoparty').config(function($routeProvider) {

    $routeProvider.when('/',{templateUrl: 'partial/home/home.html'});
    $routeProvider.when('/register',{templateUrl: 'partial/register/register.html'});
    $routeProvider.when('/login',{templateUrl: 'partial/login/login.html'});
    $routeProvider.when('/logbook',{templateUrl: 'partial/logbook/logbook.html'});
    $routeProvider.when('/results',{templateUrl: 'partial/results/results.html'});
    $routeProvider.when('/rules',{templateUrl: 'partial/rules/rules.html'});
    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/'});

});

angular.module('noagendaqsoparty').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
