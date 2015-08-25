angular.module('App').controller('AppCtrl', function($scope, $log, $ionicSlideBoxDelegate, $ionicPlatform, $ionicModal, Auth, FURL, Utils, $firebaseObject, $localStorage) {

	window.Auth = Auth;
	$ionicPlatform.ready(function() {
		if (Auth.signedIn() === false) {
			$scope.showModal('login');
		} else {
			console.log('Auth', Auth.user);
			$scope.currentUser = Auth.user;
		}
	});

	var ref = new Firebase(FURL);
	var userkey = '';

	$scope.signupData = {};
	$scope.loginData = {};
	$scope.forgotData = {};

	$scope.toSignup = function() {
		$ionicSlideBoxDelegate.$getByHandle('loginSlider').slide(0);
	};

	$scope.toLogin = function() {
		$ionicSlideBoxDelegate.$getByHandle('loginSlider').slide(1);
	};

	$scope.toForgot = function() {
		$ionicSlideBoxDelegate.$getByHandle('loginSlider').slide(2);
	}

	$scope.signup = function(user) {
		$log.log('signup', user);
		if (angular.isDefined(user)) {
			Utils.show();
			Auth.signup(user).then(function(authData) {
				$log.log('User successfully created:', authData);
				$scope.login(user);
			}, function(err) {
				Utils.hide();
				Utils.errMessage(err);
			});
		}
	};

	$scope.login = function(user) {
		$log.log('Logging In', user);
		if (angular.isDefined(user)) {
			Utils.show();
			Auth.login(user).then(function(authData) {
				//console.log('user id:' + JSON.stringify(authData));

				ref.child('profile').orderByChild('id').equalTo(authData.uid).on('child_added', function(snapshot) {
					console.log(snapshot.key());
					userkey = snapshot.key();
					$log.log('userkey', userkey);
					var obj = $firebaseObject(ref.child('profile').child(userkey));
					$log.log('profile', obj);

					obj.$loaded().then(function(data) {
							$log.log('the data', data);
							$localStorage.email = obj.email;
							$localStorage.userkey = userkey;

							$log.log('userkey', $localStorage.userkey);

							Auth.user.profile = data;
							$scope.currentUser = Auth.user;

							Utils.hide();
							$scope.closeModal('login');
						})
						.catch(function(error) {
							console.error('Error:', error);
						});
				});

			}, function(err) {
				Utils.hide();
				Utils.errMessage(err);
			});
		}
	};

	$scope.resetPassword = function(user) {
		$log.log('oh', user);
		if (angular.isDefined(user)) {
			Auth.resetPassword(user).then(function() {
				$log.log("Password reset email sent successfully!");
			}, function(err) {
				$log.error("Error: ", err);
			});
		}
	};

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
		if (name === 'login') {
			$scope.signupData = {};
			$scope.loginData = {};
			$scope.forgotData = {};
		}
		$scope[modalName].hide();
		$scope[modalName].remove();
	}

	$scope.toAppSlide = function(index) {
		$ionicSlideBoxDelegate.$getByHandle('appSlider').slide(index);
	};
});