(function() {
  'use strict';

  function DishForgotController($scope, $log, Auth, dishSliderService) {

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

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishForgotController.$inject = ['$scope', '$log', 'Auth', 'dishSliderService'];

  angular.module('dish.forgot')
    .controller('dishForgotController', DishForgotController);
})();