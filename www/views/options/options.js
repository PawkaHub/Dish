'Use Strict';
angular.module('App').controller('OptionsCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
	var ref = new Firebase(FURL);

	$scope.option = function() {
		$log.log('Option!');
	};

});