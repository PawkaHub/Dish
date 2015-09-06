(function() {
	'use strict';

	function DishBootstrapController($scope, $ionicPlatform, $timeout, $log, Auth, dishModalService) {

		$ionicPlatform.ready(function() {
			$timeout(function() {
				if (Auth.signedIn() === false) {
					$log.log('show shit');
					dishModalService.open($scope, 'signup');
				} else {
					console.log('Auth', Auth.user);
					$scope.currentUser = Auth.user;
					dishModalService.close();
				}
			});
		});
	}

	DishBootstrapController.$inject = ['$scope', '$ionicPlatform', '$timeout', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.bootstrap')
		.controller('dishBootstrapController', DishBootstrapController);
})();