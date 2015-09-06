(function() {
	'use strict';

	function DishPaymentController($scope, $log, $controller, Auth, Utils) {

		$scope.payments = [{}, {}, {}];

		$scope.payment = function() {
			$log.log('payment');
		};

		$scope.getCardHeight = function(payment, index) {
			if (index === 0) {
				return 271;
			} else {
				return 226;
			}
		}

	}

	DishPaymentController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.payment')
		.controller('dishPaymentController', DishPaymentController);
})();