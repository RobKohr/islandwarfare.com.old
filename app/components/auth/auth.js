'use strict';
angular.module('myApp.auth', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth/login', {
            templateUrl: '/components/auth/login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', function($scope) {

        console.log('hello');
    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth/register', {
            templateUrl: '/components/auth/register/register.html',
            controller: 'registerCtrl'
        });
    }])

    .controller('registerCtrl', ['$scope', 'authService', function($scope, authService) {
        $scope.submit = function(){
            var data = getFormData('form#register-form');
            console.log(data);
            authService.register(data);
        }

    }])

    .service('authService', ['$resource', function ($resource) {
        'use strict';

        return $resource('/api/auth', { id: '@id' }, {

            register: {
                method: 'post',
                url: '/api/auth/register',
                isArray: false,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                transformRequest: $.param
            },
            isLoggedIn: {
                method: 'post',
                url: '/api/auth/isLoggedIn',
                isArray: false,
                transformRequest: $.param
            }
        });

    }]);

function getFormData(query){
    var out = {};
    var s_data = $(query).serializeArray();
    //transform into simple data/value object
    for(var i = 0; i<s_data.length; i++){
        var record = s_data[i];
        out[record.name] = record.value;
    }
    return out;
}