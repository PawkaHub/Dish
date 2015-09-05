(function() {
  'use strict';

  function DishSignupController($scope, $log, $controller, Auth, Utils, dishSliderService) {

    //This allows us to reference the loginController from within signup
    var dishLoginController = $scope.$new(); //You need to supply a scope while instantiating.
    //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
    //In this case it is the child scope of this scope.
    $controller('dishLoginController', {
      $scope: dishLoginController
    });

    $scope.signup = function(user) {
      $log.log('signup', user);
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.signup(user).then(function(authData) {
          $log.log('User successfully created:', authData);
          dishLoginController.login(user);
        }, function(err) {
          Utils.hide();
          Utils.errMessage(err);
        });
      }
    };

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishSignupController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishSliderService'];

  angular.module('dish.signup')
    .controller('dishSignupController', DishSignupController);
})();