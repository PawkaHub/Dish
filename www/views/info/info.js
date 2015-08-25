'Use Strict';
angular.module('App').controller('InfoCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, $log, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
	var ref = new Firebase(FURL);

	$scope.info = function() {
		$log.log('Info!');
	};
});