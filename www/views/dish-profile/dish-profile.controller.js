(function() {
	'use strict';

	function DishProfileController($scope, $log, Auth, dishModalService) {}

	DishProfileController.$inject = ['$scope', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.profile')
		.controller('dishProfileController', DishProfileController);
})();