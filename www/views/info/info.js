(function() {
    'use strict';
    angular
        .module('newsApp.info', [])
        .config(function($stateProvider) {
            $stateProvider.state('info', {
                url: '/info',
                controller: 'infoCtrl',
                templateUrl: 'views/info/info.html'
            })
        })
        .controller('infoCtrl', infoCtrl);

    function infoCtrl($scope) {

    }
})();
