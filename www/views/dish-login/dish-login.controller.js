(function() {
	'use strict';

	function DishLoginController($scope, $log, $localStorage, $firebaseObject, Utils, Auth, FURL, dishSliderService, dishModalService) {
		var ref = new Firebase(FURL);
		var userkey = '';

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
								dishModalService.close();
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

		$scope.toSignup = function() {
			dishSliderService.slide(0);
		};

		$scope.toForgot = function() {
			dishSliderService.slide(2);
		}
	}

	DishLoginController.$inject = ['$scope', '$log', '$localStorage', '$firebaseObject', 'Utils', 'Auth', 'FURL', 'dishSliderService', 'dishModalService'];

	angular.module('dish.login')
		.controller('dishLoginController', DishLoginController);
})();