(function() {
	'use strict';

	function DishPromotionsController($scope, $log, $controller, Auth, Utils) {

		$scope.invite = function() {
			$log.log('invite');
		};

		$scope.rate = function() {
			$log.log('rate');
		};

		$scope.share = function() {
			$log.log('share');
		};

		$scope.getCardHeight = function(promotion, index) {
			if (index === 0) {
				return 165;
			} else if (index === $scope.promotions.length - 1) {
				return 125;
			} else {
				return 115;
			}
		};

		$scope.promotions = [{
			icon: 'ion-android-person',
			command: $scope.invite,
			button: 'Invite a Friend and<br/>Get a meal for free'
		}, {
			icon: 'ion-ios-heart',
			command: $scope.rate,
			button: 'Recommend Dish and get a free meal'
		}, {
			icon: 'ion-ios-upload',
			command: $scope.share,
			button: 'Share Dish and get<br/>a meal for free'
		}];

	}

	DishPromotionsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.promotions')
		.controller('dishPromotionsController', DishPromotionsController);
})();