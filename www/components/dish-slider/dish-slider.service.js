(function() {
	'use strict';

	function DishSliderService($window, $q, $timeout, $ionicSlideBoxDelegate) {
		var _self = this;

		_self.enableSlide = function _enableSlide(enabled) {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').enableSlide(enabled);
		};

		_self.slide = function _slide(index, speed) {
			//console.log('DishSliderService slide');
			window.disableConstantFocus = true;
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').slide(index, speed);
			$timeout(function() {
				window.disableConstantFocus = false;
			}, 400);
		};

		_self.currentIndex = function _currentIndex() {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').currentIndex();
		}
	}

	DishSliderService.$inject = ['$window', '$q', '$timeout', '$ionicSlideBoxDelegate'];

	angular.module('dish.slider')
		.service('dishSliderService', DishSliderService);
})();