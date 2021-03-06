(function() {
	'use strict';

	function DishButtonDirective($window, $q) {
		var invalid;
		return {
			restrict: 'AE',
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				//console.log('buttonText', attrs.text);
				attrs.$observe('text', function() {
					console.log('buttonText', attrs.text);
					scope.buttonText = attrs.text;
				});
				if (attrs.type) {
					scope.buttonType = 'button-' + attrs.type;
				} else {
					scope.buttonType = 'button-positive';
				}
			},
			template: '<button class="dish-button button button-full {{buttonType}}">{{buttonText}}</button>'
		};
	}

	DishButtonDirective.$inject = ['$window', '$q'];

	angular.module('dish.button')
		.directive('dishButton', DishButtonDirective);
})();