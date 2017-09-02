(function() {
    'use strict';
    angular
        .module('newsApp.detail', [])
        .config(function($stateProvider) {
            $stateProvider.state('detail', {
                url: '/detail?tid',
                controller: 'detailCtrl',
                templateUrl: 'views/detail/detail.html',
                resolve: {
                    resultDate: function($http, $stateParams) {
                        return $http({
                            method: 'GET',
                            url: '/data/detail' + $stateParams.tid + '.json'
                        }).then(function(res) {
                            return res.data;
                        })
                    }
                }
            })
        })
        .controller('detailCtrl', detailCtrl);

    function detailCtrl($scope, $timeout, resultDate) {
        $.showPreloader();
        $timeout(function() {
            $scope.dataList = resultDate;
            $.hidePreloader();
        }, 500)

        $scope.isExpand = false;
        $scope.expand = function() {
            $scope.isExpand = true;
        }
    }
})();
