angular.module('App').controller('AppCtrl', ['$scope', '$log', '$ionicSlideBoxDelegate', function($scope, $log, $ionicSlideBoxDelegate) {
	$scope.toAppSlide = function(index) {
		$ionicSlideBoxDelegate.$getByHandle('appSlider').slide(index);
	};
}]);