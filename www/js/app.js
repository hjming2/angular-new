(function() {
    'use strict';
    angular.module('newsApp', [
            'ngResource',
            'ui.router',
            'ngSanitize',
            'newsApp.tabs',
            'newsApp.home',
            'newsApp.me',
            'newsApp.info',
            'newsApp.search',
            'newsApp.detail',
            'newsApp.uname'
        ])
        .config(function($urlRouterProvider) {
            $urlRouterProvider.otherwise('/tabs/home');
        })
        .run(function($rootScope, $state, $stateParams, $window) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
                // to be used for back button //won't work when page is reloaded.
                $rootScope.previousState_name = fromState.name;
                $rootScope.previousState_params = fromParams;
            });
            //back button function called from back button's ng-click="back()"
            $rootScope.back = function() {
                $state.go($rootScope.previousState_name, $rootScope.previousState_params);
            };
            $rootScope.reloadRoute = function() {
                $window.location.reload();
            };
        })
        .controller('mainCtrl', function($rootScope){
            $rootScope.infoData = {
                username: 'gmg724130585',
                password: 123456
            }
        })
})();
