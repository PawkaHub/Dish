(function() {
	'use strict';

	function DishBootstrapController($scope, $ionicPlatform, $log, Auth, dishModalService) {

		$ionicPlatform.ready(function() {
			if (Auth.signedIn() === false) {
				$log.log('show shit');
				dishModalService.open($scope, 'signup');
			} else {
				console.log('Auth', Auth.user);
				$scope.currentUser = Auth.user;
			}
		});
	}

	DishBootstrapController.$inject = ['$scope', '$ionicPlatform', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.bootstrap')
		.controller('dishBootstrapController', DishBootstrapController);
})();