(function() {
  'use strict';

  function DishSettingsController($scope, $log, $controller, Auth, Utils, dishModalService) {

    $scope.logout = function() {
      $log.log('logout');
      Auth.logout();
      dishModalService.open($scope, 'signup');
    };

  }

  DishSettingsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishModalService'];

  angular.module('dish.settings')
    .controller('dishSettingsController', DishSettingsController);
})();