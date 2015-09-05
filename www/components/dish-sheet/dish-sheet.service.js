(function() {
	'use strict';

	function DishSheetService($window, $q, $ionicActionSheet, $timeout) {
		var _self = this;
		var sheetActive = false;

		_self.show = function _show(options) {
			var deferred = $q.defer();
			var actionSheet;

			if (sheetActive) {
				return deferred.promise;
			}

			if (!options) {
				deferred.reject({
					error: 'No options included for action sheet.'
				});
			}

			sheetActive = true;

			actionSheet = $ionicActionSheet.show({
				buttons: options,
				cancelText: 'Cancel',
				cancel: function() {
					sheetActive = false;
				},
				buttonClicked: function(index) {
					sheetActive = false;
					actionSheet(); //Close the actionSheet
					deferred.resolve(index);
				}
			})
			return deferred.promise;
		};
	};

	DishSheetService.$inject = ['$window', '$q', '$ionicActionSheet', '$timeout'];

	angular.module('dish.sheet')
		.service('dishSheetService', DishSheetService);
})();