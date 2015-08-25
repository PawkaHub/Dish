angular.module('App').controller('AppCtrl', function($scope, $log, $ionicSlideBoxDelegate) {
	$scope.toAppSlide = function(index) {
		$ionicSlideBoxDelegate.$getByHandle('appSlider').slide(index);
	};
});