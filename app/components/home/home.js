'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'components/home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$timeout', 'authService', function($scope, $timeout, authService) {
    $scope.log_in_test_complete = authService.log_in_test_complete;
    authService.isLoggedIn(function(logged_in_user) {
        $scope.logged_in_user = logged_in_user;
        $scope.log_in_test_complete = authService.log_in_test_complete;
    });
}]);