(function() {
  'use strict';

  function DishHelpController($scope, $log, $controller, Auth, Utils) {

    $scope.help = function() {
      $log.log('help');
    };

  }

  DishHelpController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

  angular.module('dish.help')
    .controller('dishHelpController', DishHelpController);
})();