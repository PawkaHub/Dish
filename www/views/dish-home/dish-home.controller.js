(function() {
	'use strict';

	function DishHomeController($scope, $log, $firebaseArray, FURL, Auth, dishKeyboardService, dishModalService) {

		var url = FURL + '/meals';
		var ref = new Firebase(url);
		$scope.meals = $firebaseArray(ref);

		$scope.meals.$loaded().then(function(result) {
			$log.log('oh');
			//Initialize Cards
			var data = [{
				image: "img/cards/1.jpg",
				name: "Cool Name",
				icon: "img/cards/icons/1.png"
			}, {
				image: "img/cards/2.jpg",
				name: "Rock & Roll",
				icon: "img/cards/icons/2.png"
			}, {
				image: "img/cards/3.jpg",
				name: "Best App",
				icon: "img/cards/icons/3.png"
			}, {
				image: "img/cards/4.jpg",
				name: "Cool Name",
				icon: "img/cards/icons/4.png"
			}, {
				image: "img/cards/5.jpg",
				name: "Rock & Roll",
				icon: "img/cards/icons/5.png"
			}, {
				image: "img/cards/6.jpg",
				name: "Best App",
				icon: "img/cards/icons/6.png"
			}, {
				image: "img/cards/7.jpg",
				name: "Cool Name",
				icon: "img/cards/icons/7.png"
			}];
			//multiTaskView(document.getElementById("multitask-view"), data);
		}).catch(function(error) {
			console.log('error', error)
		});

		$scope.currentUser = Auth.user;

		$scope.getCardWidth = function(food, index) {
			return window.innerWidth;
		}

		$scope.getCardHeight = function(food, index) {
			return window.innerHeight;
		}

		$scope.toCook = function() {
			$log.log('toCook');
			$scope.swiper.slideTo(0);
		}

		$scope.toFood = function() {
			$log.log('toFood');
			$scope.swiper.slideTo(1);
		}

		$scope.toProfile = function() {
			$log.log('toProfile');
			$scope.swiper.slideTo(2);
		}

		$scope.onSwiperReady = function(swiper) {
			swiper.on('sliderMove', function() {
				dishKeyboardService.close();
			});
		}

		$scope.onScroll = function() {
			dishKeyboardService.close();
		}

		$scope.openModal = function(name) {
			if (!name) return;
			dishModalService.open($scope, name);
		}

		$scope.closeModal = function() {
			dishModalService.close();
		}
	}

	DishHomeController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL', 'Auth', 'dishKeyboardService', 'dishModalService'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();