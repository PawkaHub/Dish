(function() {
	'use strict';

	function DishFoodController($scope, $log, $firebaseArray, FURL) {

		$scope.buy = function() {
			$log.log('buy');
		};

	}

	DishFoodController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL'];

	angular.module('dish.forgot')
		.controller('dishFoodController', DishFoodController);
})();