(function() {
	'use strict';

	function DishKeyboardDirective($window, $q, $timeout) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				//console.log('attrs', attrs, elm);
				//Maintain focus whenever it gets lost
				elm[0].addEventListener('focusout', function(e) {
					if (window.disableConstantFocus) {
						return;
					}
					//console.log('focus lost', e);
					if (e.relatedTarget && e.relatedTarget.tagName === 'INPUT') {
						//console.log('don\'t refocus');
						return;
					} else {
						//console.log('refocus');
						elm[0].focus();
					}
				});

				/*ctrl.scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						document.getElementById('maintainKeyboard').focus();
					}
				});*/

				/*ctrl.scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					//console.log('$ionicView.afterEnter', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					elm[0].focus();
					//}
				});*/

				/*scope.$on('$ionicView.loaded', function viewEnter(e) {
					console.log('$ionicView.loaded', attrs.constantFocus);
				});

				ctrl.scope.$on('$ionicView.enter', function viewEnter(e) {
					console.log('$ionicView.enter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						console.log('focus first');
						elm[0].focus();
					}
				});

				scope.$on('$ionicView.leave', function viewEnter(e) {
					console.log('$ionicView.leave', attrs.constantFocus);
				});

				scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					document.getElementById('maintainKeyboard').focus();
				});

				scope.$on('$ionicView.beforeLeave', function viewEnter(e) {
					console.log('$ionicView.beforeLeave', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					//document.getElementById('maintainKeyboard').focus();
					//}
				});

				scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					console.log('$ionicView.afterEnter', attrs.constantFocus);
				});

				scope.$on('$ionicView.afterLeave', function viewEnter(e) {
					console.log('$ionicView.afterLeave', attrs.constantFocus);
				});

				scope.$on('$ionicView.unloaded', function viewEnter(e) {
					console.log('$ionicView.unloaded', attrs.constantFocus);
				});*/
			}
		};
	};

	DishKeyboardDirective.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.directive('constantFocus', DishKeyboardDirective);
})();