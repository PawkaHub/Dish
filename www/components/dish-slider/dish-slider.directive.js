(function() {
	'use strict';

	function DishSliderDirective($window, $q, $compile, $templateRequest, $ionicSlideBoxDelegate, dishSliderService) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				onSlideChanged: '&'
			},
			link: function(scope, elm, attrs, ctrl, transclude) {
				//Get the type and use that as the name of the modal, showing a default modal if the template doesn't exist
				var templateUrl;

				transclude(scope, function(clones) {
					angular.forEach(clones, function(clone) {
						if (clone.tagName === 'DISH-SLIDE') {
							//console.log('found', clone);
							templateUrl = clone.attributes.template.value;
							scope.slides.push(templateUrl);
						}
					});
				});

				//dishSliderService.enableSlide(false);
			},
			controller: ['$scope', function($scope) {
				$scope.slides = [];
				$scope.slide = function(index) {
					dishSliderService.slide(index);
				};
			}],
			template: '<ion-slide-box class="dish-slider" show-pager="false" delegate-handle="dishSlider" active-slide="0"><dish-slide ng-repeat="slide in slides" template="{{slide}}"></dish-slide></ion-slide-box>'
		};
	}

	DishSliderDirective.$inject = ['$window', '$q', '$compile', '$templateRequest', '$ionicSlideBoxDelegate', 'dishSliderService'];

	angular.module('dish.slider')
		.directive('dishSlider', DishSliderDirective);
})();