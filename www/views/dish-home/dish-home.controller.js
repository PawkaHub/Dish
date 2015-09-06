(function() {
	'use strict';

	function DishHomeController($scope, $log, Auth) {

		$scope.currentUser = Auth.user;

		$scope.getCardWidth = function(food, index) {
			return window.innerWidth;
		}

		$scope.getCardHeight = function(food, index) {
			return window.innerHeight;
		}

	}

	DishHomeController.$inject = ['$scope', '$log', 'Auth'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();