'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.services',
    'myApp.home',
    'myApp.island_list',
    'myApp.island',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.auth'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo: '/home'});
}]);
