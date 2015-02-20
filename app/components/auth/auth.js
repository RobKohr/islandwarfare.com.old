'use strict';
angular.module('myApp.auth', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth/login', {
            templateUrl: '/components/auth/login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', 'authService', function($scope, authService) {
        $scope.submit = function(){
            var data = Utils.getFormData('form#login-form');
            authService.login(data);
        }

    }])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth/register', {
            templateUrl: '/components/auth/register/register.html',
            controller: 'registerCtrl'
        });
    }])

    .controller('registerCtrl', ['$scope', 'authService', function($scope, authService) {
        $scope.submit = function(){
            var data = Utils.getFormData('form#register-form');
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
            login: {
                method: 'post',
                url: '/api/auth/login',
                isArray: false,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                transformRequest: $.param
            },
            isLoggedIn: {
                method: 'get',
                url: '/api/auth/isLoggedIn',
                isArray: false
            }
        });

    }]);