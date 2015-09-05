'Use Strict';
angular.module('dish', ['ionic', 'dish.input', 'ngStorage', 'ngCordova', 'firebase', 'ngMessages', 'templates'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {}])
  // Changue this for your Firebase App URL.
  .constant('FURL', 'https://dishapp.firebaseio.com/')
  .run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.disableScroll(true);
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }]);