(function() {
  'use strict';

  function DishCookController($scope, $log, $firebaseArray, FURL) {
    var url = FURL + '/meals';
    var ref = new Firebase(url);

    // create a query for the most recent 25 meals on the server
    var query = ref.orderByChild("cookedTime").limitToLast(25);

    $scope.recipes = $firebaseArray(ref);

    //Push a recipe card into the beginning of the recipes array that isn't synced back to the server so that users can create recipes
    $scope.recipes.$loaded(function() {
      $scope.recipes.unshift({});
      $log.log('loaded', $scope.recipes);
    });

    $scope.valid = function(recipe) {
      if (!recipe) {
        return false;
      }
      recipe.photo = 'https://s-media-cache-ak0.pinimg.com/474x/53/4d/7b/534d7b4630c75ac608bd6b46461f1d8d.jpg'; //Shim for local testing
      if (!recipe.photo) return false;
      if (!recipe.name) return false;
      if (!recipe.ingredients) return false;
      if (!recipe.portions) return false;
      if (!recipe.price) return false;
      return true;
    };

    $scope.cook = function(recipe) {
      $log.log('cook', recipe);
      if (!$scope.currentUser) return;
      recipe.user = $scope.currentUser.profile.$id;
      recipe.cookedTime = new Date().getTime();
      recipe.state = 'pickup';
      recipe.timestamp = Firebase.ServerValue.TIMESTAMP;
      $scope.meals.$add(recipe);
    };

  }

  DishCookController.$inject = ['$scope', '$log', '$firebaseArray', 'FURL'];

  angular.module('dish.cook')
    .controller('dishCookController', DishCookController);
})();