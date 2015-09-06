(function() {
  'use strict';

  function DishTrayFactory($scope) {
    return {
      transitionUp: function() {
        console.log('up');
        draggableTray.transitionUp();
      },
      transitionDown: function() {
        console.log('down');
        draggableTray.transitionDown();
      },
      transitionHide: function() {
        console.log('hide');
        draggableTray.transitionHide();
      }
    }
  };

  DishTrayFactory.$inject = ['$scope'];

  angular.module('dish.tray')
    .factory('$dishTrayDelegate', DishTrayFactory);
})();