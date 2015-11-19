(function() {
	'use strict';

	function DishPreviewController($q, $scope, $log, $ionicScrollDelegate, dishModalService) {
		var _self = this;

		_self.resetZoom = function() {
			$log.log('resetZoom');
			$ionicScrollDelegate.$getByHandle('dishZoom').zoomTo(1, true);
		}
	}

	DishPreviewController.$inject = ['$q', '$scope', '$log', '$ionicScrollDelegate', 'dishModalService'];

	angular.module('dish.preview')
		.controller('dishPreviewController', DishPreviewController);
})();