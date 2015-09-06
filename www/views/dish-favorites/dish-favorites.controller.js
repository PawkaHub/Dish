(function() {
	'use strict';

	function DishFavoritesController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate favorites accordingly after that.
		$scope.favorites = [{}, {}, {}];

		$scope.favorite = function() {
			$log.log('favorite');
		};
	}

	DishFavoritesController.$inject = ['$scope', '$log'];

	angular.module('dish.favorites')
		.controller('dishFavoritesController', DishFavoritesController);
})();