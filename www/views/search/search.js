(function() {
    'use strict';
    angular
        .module('newsApp.search', [])
        .config(function($stateProvider) {
            $stateProvider.state('search', {
                url: '/search',
                controller: 'searchCtrl',
                templateUrl: 'views/search/search.html'
            })
        })
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($scope, $rootScope, $http) {
        $scope.$watch('kw', function() {
            if (!$scope.kw || $scope.kw == '') {
                $scope.dataList = '';
                return;
            } else {
                $http({
                    method: 'GET',
                    url: '/data/home.json'
                }).then(function(res) {
                    $scope.dataList = res.data;
                })
            }
        })
    }
})();
