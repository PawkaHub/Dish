(function() {
	'use strict';

	function DishTransactionsController($scope, $log) {

		$scope.transactions = [{}, {}, {}];

		$scope.transaction = function() {
			$log.log('transaction');
		};
	}

	DishTransactionsController.$inject = ['$scope', '$log'];

	angular.module('dish.transactions')
		.controller('dishTransactionsController', DishTransactionsController);
})();