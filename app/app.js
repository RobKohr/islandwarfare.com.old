'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.services',
  'myApp.home',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])

.controller('navListCtrl', ['$scope', '$rootScope', 'IsLoggedIn', function($scope, $rootScope, IsLoggedIn) {
      $scope.nav_pages = [];
      $scope.phone = IsLoggedIn.get({}, function(data) {
        $rootScope.logged_in = data.logged_in;
        if(data.logged_in){
          $scope.nav_pages = ['home', 'settings', 'ranking', 'alliance', 'friends', 'events', 'mail', 'logout'];
          $rootScope.logged_in_username = data.logged_in_username;
        }else{
          $scope.nav_pages = ['home', 'register', 'login'];
        }

        console.log($rootScope.logged_in)
      });


}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
