(function() {
	'use strict';

	function DishSlideDirective($window, $q, $templateRequest, $compile) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			link: function(scope, elm, attrs, ctrl) {
				//console.log('dishSlide!', elm, attrs);
				//Get the templateContentUrl and use that to display the appropriate content page
				var templateContentUrl = attrs.template;
				$templateRequest(templateContentUrl).then(function(html) {
					var template = angular.element(html);
					elm.append(template);
					$compile(template)(scope);
				});
				elm[0].classList.add('slider-slide');
			},
		};
	}

	DishSlideDirective.$inject = ['$window', '$q', '$templateRequest', '$compile'];

	angular.module('dish.slider')
		.directive('dishSlide', DishSlideDirective);
})();