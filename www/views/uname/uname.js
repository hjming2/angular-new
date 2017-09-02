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