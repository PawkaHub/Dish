'Use Strict';
angular.module('App').controller('HomeCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, $log, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
	var ref = new Firebase(FURL);

	$scope.logout = function() {
		$log.log('Logout');
		Auth.logout();
		$scope.showModal('login');
	};
});