(function() {
  'use strict';

  function DishCookController($scope, $log) {
    $scope.recipes = [{}, {}, {}, {}, {}, {}];

    $scope.cook = function() {
      $log.log('cook');
    };

  }

  DishCookController.$inject = ['$scope', '$log'];

  angular.module('dish.cook')
    .controller('dishCookController', DishCookController);
})();