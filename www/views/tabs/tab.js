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