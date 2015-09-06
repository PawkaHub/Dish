(function() {
	'use strict';

	function DishTransactionsController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate transactions accordingly after that.
		$scope.transactions = [{}, {}, {}];

		$scope.transaction = function() {
			$log.log('transaction');
		};
	}

	DishTransactionsController.$inject = ['$scope', '$log'];

	angular.module('dish.transactions')
		.controller('dishTransactionsController', DishTransactionsController);
})();