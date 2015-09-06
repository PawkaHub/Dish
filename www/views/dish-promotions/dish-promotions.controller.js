(function() {
  'use strict';

  function DishPromotionsController($scope, $log, $controller, Auth, Utils) {

    $scope.promotion = function() {
      $log.log('promotion');
    };

  }

  DishPromotionsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

  angular.module('dish.promotions')
    .controller('dishPromotionsController', DishPromotionsController);
})();