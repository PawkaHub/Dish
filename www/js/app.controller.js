angular.module('App').controller('AppCtrl', function($scope, $log, $ionicSlideBoxDelegate, $ionicPlatform, $ionicModal, Auth) {

	$ionicPlatform.ready(function() {
		if (Auth.signedIn() === false) {
			$scope.showModal('login');
		}
	});

	$scope.showModal = function(name, payload) {
		if (!name) return;
		modalName = name + 'Modal';
		$ionicModal.fromTemplateUrl(name + '/' + name + '.html', {
			scope: $scope,
			hardwareBackButtonClose: $scope.backButtonEnabled
		}).then(function(modal) {
			$scope[modalName] = modal;
			$scope[modalName].show();
		});
	};

	$scope.closeModal = function(name) {
		$scope.backButtonEnabled = true;
		modalName = name + 'Modal';
		$scope[modalName].hide();
		$scope[modalName].remove();
	}

	$scope.toAppSlide = function(index) {
		$ionicSlideBoxDelegate.$getByHandle('appSlider').slide(index);
	};
});