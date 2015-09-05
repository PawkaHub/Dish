(function() {
	'use strict';

	function DishHomeController($scope, $log, Auth) {

		$scope.currentUser = Auth.user;

		$scope.home = function() {
			$log.log('home');
		};
	}

	DishHomeController.$inject = ['$scope', '$log', 'Auth'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();