(function() {
	'use strict';

	function DishHomeController($scope, $log, $firebaseArray, FURL, Auth, dishKeyboardService, dishModalService) {
		var vm = this;
		var url = FURL + '/profile';
		var ref = new Firebase(url);
		vm.cooks = $firebaseArray(ref);

		vm.cooks.$loaded().then(function(result) {
			//$log.log('oh', result, $scope.cooks);
		}).catch(function(error) {
			$log.log('error', error)
		});

		vm.viewCook = function(cook) {
			if (!cook) return;
			$log.log('view', cook);
		}
	}

	DishHomeController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL', 'Auth', 'dishKeyboardService', 'dishModalService'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();