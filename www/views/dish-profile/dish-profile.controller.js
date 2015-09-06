(function() {
	'use strict';

	function DishProfileController($scope, $log, Auth, dishModalService) {

		$scope.logout = function() {
			$log.log('logout');
			Auth.logout();
			dishModalService.open($scope, 'signup');
		}
	}

	DishProfileController.$inject = ['$scope', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.profile')
		.controller('dishProfileController', DishProfileController);
})();