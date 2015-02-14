/*
$.post( "api/auth/register", { name: "John", time: "2pm" }, function( data ) {
console.log(data);
});
    */

'use strict';
var page = 'register';
var pageCamel = 'register';
var dir = 'auth';
angular.module('myApp.'+page, ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/'+dir+'/'+page, {
            templateUrl: '../../'+dir+'/'+page+'/'+page+'.html',
            controller: pageCamel+'Ctrl'
        });
    }])

    .controller(pageCamel+'Ctrl', ['$scope', 'IslandListSrv','$routeParams', function($scope, IslandListSrv, $routeParams) {

    }]);