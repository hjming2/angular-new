(function() {
    'use strict';
    angular
        .module('newsApp.home', [])
        .config(function($stateProvider) {
            $stateProvider.state('tabs.home', {
                url: '/home',
                templateUrl: 'views/home/home.html',
                controller: 'homeCtrl',
                resolve: {
                    HttpResult: function($http) {  //页面加载前先获取数据
                        return $http({
                                method: 'GET',
                                url: '/data/home.json'
                            })
                            .then(function(res) {
                                return res.data;
                            })
                    }
                }
            })
        })
        .controller('homeCtrl', function($scope, $http, $timeout, HttpResult) {
            $scope.hasData = false;
            $scope.dataList = HttpResult;
            $scope.maxLen = $scope.dataList.length;  //保存数据总长度
            if ($scope.dataList.length > 5) {  //限制初始加载最多5条数据
                $scope.dataList.length = 5
            }
        })
        .directive('infiniteScroll', function($timeout, $http) {
            return {
                link: function($scope, elem, attr) {
                    elem[0].addEventListener('scroll', function(){
                        if ($(this).scrollTop() >= ($('.list_content',$(this)).height() - $(this).height())) {
                            var currentLen = $scope.dataList.length;  // 保存当前数据长度
                            if(currentLen == $scope.maxLen) return;  //所有数据加载完就不再加载
                            $scope.$apply(function() {
                                loadMord();
                            })
                        }
                    }, false)

                    function loadMord() {
                        if ($scope.hasData) return;

                        $scope.hasData = true;
                        $timeout(function() {  //模拟1.5S的加载时间
                            $http({
                                    method: 'GET',
                                    url: '/data/home.json'
                                })
                                .then(function(res) {
                                    var len = $scope.dataList.length;
                                    $scope.dataList = res.data;

                                    $scope.dataList.length = len + 5;  //每次加载5条数据
                                    if ($scope.dataList.length > $scope.maxLen) {
                                        $scope.dataList.length = $scope.maxLen;
                                    }
                                    $scope.hasData = false;
                                })
                        }, 1500)

                    }

                }
            }
        })

})();
