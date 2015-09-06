(function() {
	'use strict';

	function DishInputDirective($window, $q, $ionicPopup) {
		var invalid;
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				scope.inputName = attrs.ngModel.split('.').pop();
				scope.placeholder = attrs.placeholder;
				scope.id = attrs.id;
				console.log('attrs', attrs.readonly);
				if (attrs.readonly) {
					scope.readonly = true;
				} else {
					scope.readonly = false;
				}

				//Based on the input name, assign the proper field type accordingly if it's a password or email
				switch (scope.inputName) {
					case 'email':
						scope.inputType = 'email';
						scope.minLength = 0;
						scope.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
						break;
					case 'password':
						scope.inputType = 'password';
						scope.minLength = 8;
						break;
					case 'price':
						scope.inputType = 'number';
						//scope.minLength = 9;
						scope.pattern = '[0-9]*';
						break;
					case 'portions':
						scope.inputType = 'number';
						//scope.minLength = 0;
						//scope.maxLength = 3;
						scope.pattern = '[0-9]*';
						break;
					default:
						scope.inputType = 'text';
						scope.minLength = 0;
				}
			},
			template: '<label class="item item-input dish-input"><input id="{{id}}" name="{{inputName}}" type="{{inputType}}" autocomplete="off" autocorrect="off" autocapitalize="off" required="true" ng-model="ngModel" pattern="{{pattern}}" ng-minlength="minLength" placeholder="{{placeholder}}" ng-readonly="readonly"><i class="error icon ion-ios-close assertive"></i></label>'
		};
	}

	DishInputDirective.$inject = ['$window', '$q', '$ionicPopup'];

	angular.module('dish.input')
		.directive('dishInput', DishInputDirective);
})();