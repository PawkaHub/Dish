(function() {
	'use strict';

	function DishFoodController($scope, $log) {
		$scope.foods = [{}, {}, {}, {}, {}, {}];

		$scope.food = function() {
			$log.log('food');
		};

	}

	DishFoodController.$inject = ['$scope', '$log'];

	angular.module('dish.forgot')
		.controller('dishFoodController', DishFoodController);
})();