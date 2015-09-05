(function() {
	'use strict';

	function DishKeyboardService($window, $q, $timeout) {
		var _self = this;

		_self.close = function _close() {
			if (window.cordova) {
				window.disableConstantFocus = true;
				ionic.keyboard.disable();
				cordova.plugins.Keyboard.close();
				$timeout(function() {
					ionic.keyboard.enable();
					window.disableConstantFocus = false;
				}, 400);
			}
		};

		_self.focusInput = function _focusInput(inputId, delay) {
			var input;
			var focusTime = 0;
			if (inputId) {
				if (delay) {
					focusTime = 400;
				}
				$timeout(function() {
					input = document.querySelector('#' + inputId);
					if (input) {
						input.focus();
					}
				}, focusTime);
			}
		}
	};

	DishKeyboardService.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.service('dishKeyboardService', DishKeyboardService);
})();