(function() {
	'use strict';

	function DishHomeController($scope, $log, Auth) {

		$scope.currentUser = Auth.user;

		//We use this to populate the swiper screens
		$scope.screens = [{
			template: 'dish-cook/dish-cook.html'
		}, {
			template: 'dish-food/dish-food.html'
		}, {
			template: 'dish-profile/dish-profile.html'
		}];

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