(function() {
	'use strict';

	function DishModalService($window, $q, $ionicModal) {
		var _self = this;
		var dishModal, modalUrl;

		_self.open = function open($scope, name) {
			if (!name) return;
			modalUrl = 'views/dish-' + name + '/' + 'dish-' + name + '-modal.html';
			$ionicModal.fromTemplateUrl(modalUrl, {
				scope: $scope,
				hardwareBackButtonClose: false,
				focusFirstInput: true,
				animation: 'slide-in-up'
			}).then(function(modal) {
				dishModal = modal;
				dishModal.show();
			});
		};

		_self.close = function close() {
			if (!dishModal) return;
			dishModal.hide();
			dishModal.remove();
		};
	}

	DishModalService.$inject = ['$window', '$q', '$ionicModal'];

	angular.module('dish.modal')
		.service('dishModalService', DishModalService);
})();