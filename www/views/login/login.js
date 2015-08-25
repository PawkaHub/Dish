'Use Strict';
angular.module('App').controller('LoginCtrl', function($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);
  var userkey = '';
  $scope.signIn = function(user) {
    console.log('Logging In');
    if (angular.isDefined(user)) {
      Utils.show();
      Auth.login(user)
        .then(function(authData) {
          //console.log('user id:' + JSON.stringify(authData));

          ref.child('profile').orderByChild('id').equalTo(authData.uid).on('child_added', function(snapshot) {
            console.log(snapshot.key());
            userkey = snapshot.key();
            var obj = $firebaseObject(ref.child('profile').child(userkey));

            obj.$loaded()
              .then(function(data) {
                //console.log(data === obj); // true
                //console.log(obj.email);
                $localStorage.email = obj.email;
                $localStorage.userkey = userkey;

                Utils.hide();
                $scope.closeModal('login');
                console.log('User logged in');
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

});