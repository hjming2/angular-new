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

(function () {
	'use strict';
	angular
	.module('newsApp.me', [])
	.config(function ($stateProvider) {
		$stateProvider.state('tabs.me', {
			url: '/me',
			controller: 'meCtrl',
			templateUrl: 'views/me/me.html'
		})
	})
	.controller('meCtrl', meCtrl);

	function meCtrl ($scope) {
		

	}
})();

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

(function() {
	'use strict';
	angular
		.module('newsApp.tabs', [])
		.config(function($stateProvider) {
			$stateProvider
			.state('tabs', {
				url: '/tabs',
				abstract: true,
				controller: 'tabsCtrl',
				templateUrl: 'views/tabs/tab.html'
			})
			// .state('tabs.home', {
   //              url: '/home',
   //              templateUrl: 'views/home/home.html',
   //              resolve: {
   //                  HttpResult: function($http) {
   //                      return $http({
   //                              method: 'GET',
   //                              url: '/data/home.json'
   //                          })
   //                          .then(function(res) {
   //                              return res;
   //                          })
   //                  }
   //              },
   //              controller: function ($scope, HttpResult) {
   //          		$scope.asd();
   //                  $scope.dataList = HttpResult;
   //                  console.log($scope.dataList);
   //              }
   //          })
		})
		.controller('tabsCtrl', tabsCtrl)

	function tabsCtrl($scope) {
		
	}
})();
(function(){
	'use strict';
	angular
		.module('newsApp.uname', [])
		.config(function($stateProvider){
			$stateProvider.state('uname', {
				url: '/uname',
				controller: 'unameCtrl',
				templateUrl: 'views/uname/uname.html'
			})
		})
		.controller('unameCtrl', function(){
			if($('input').hasClass('ng-invalid-required')){
				$.alert('用户名不能为空');
			}
		})
		.directive('submitForm', function(){
			return {
				link: function(scope, elem, attr){

				}
			}
		})
})();