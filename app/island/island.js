'use strict';

angular.module('myApp.island', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/island/:key', {
    templateUrl: 'island/island.html',
    controller: 'islandCtrl'
  });
}])

.controller('islandCtrl', [function() {

}]);