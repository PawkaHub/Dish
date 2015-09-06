(function() {
	'use strict';

	function DishHomeController($scope, $log, Auth) {

		$scope.swiper = {};
		$scope.currentUser = Auth.user;

		//We use this to populate the swiper screens, as it only fires when it's got an ng-repeat included with it
		$scope.screens = [{
			template: 'dish-cook/dish-cook.html'
		}, {
			template: 'dish-food/dish-food.html'
		}, {
			template: 'dish-transactions/dish-transactions.html'
		}];

		$scope.getCardWidth = function(food, index) {
			return window.innerWidth;
		}

		$scope.getCardHeight = function(food, index) {
			return window.innerHeight;
		}

		$scope.toCook = function() {
			$log.log('toCook');
			$scope.swiper.slideTo(0);
		}

		$scope.toFood = function() {
			$log.log('toFood');
			$scope.swiper.slideTo(1);
		}

		$scope.toProfile = function() {
			$log.log('toProfile');
			$scope.swiper.slideTo(2);
		}

	}

	DishHomeController.$inject = ['$scope', '$log', 'Auth'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();