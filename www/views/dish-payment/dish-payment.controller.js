(function() {
	'use strict';

	function DishPaymentController($scope, $log, $controller, Auth, Utils) {

		$scope.delete = function() {
			$log.log('delete');
		}

		$scope.add = function() {
			$log.log('add');
		};

		$scope.getCardHeight = function(payment, index) {
			if (index === 0) {
				return 271;
			} else if (index === $scope.payments.length - 1) {
				return 236;
			} else {
				return 226;
			}
		};

		$scope.payments = [{
			type: 'delete'
		}, {
			type: 'delete'
		}, {
			type: 'add'
		}];

	}

	DishPaymentController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.payment')
		.controller('dishPaymentController', DishPaymentController);
})();