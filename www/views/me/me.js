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
