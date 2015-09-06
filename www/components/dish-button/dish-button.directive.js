(function() {
	'use strict';

	function DishButtonDirective($window, $q) {
		var invalid;
		return {
			restrict: 'AE',
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				scope.buttonText = attrs.text;
			},
			template: '<button class="dish-button button button-full button-positive">{{buttonText}}</button>'
		};
	}

	DishButtonDirective.$inject = ['$window', '$q'];

	angular.module('dish.button')
		.directive('dishButton', DishButtonDirective);
})();