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
            authService.register(data);
        }

    }])

    .service('authService', ['$resource', '$timeout', function ($resource, $timeout) {
        'use strict';

        var factory =  $resource('/api/auth', { id: '@id' }, {

            register: {
                method: 'post',
                url: '/api/auth/register',
                isArray: false,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                transformRequest: $.param
            },
            login: {
                method: 'post',
                url: '/api/auth/login',
                isArray: false,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                transformRequest: $.param
            },
            isLoggedInRequest: {
                method: 'get',
                url: '/api/auth/isLoggedIn',
                isArray: false
            },
            logout: {
                method: 'get',
                url: '/api/auth/logout',
                isArray: false
            }
        });
        var waiting = null;
        factory.logged_in_user = null;
        factory.log_in_test_complete = false;
        factory.isLoggedIn = function(callback){
            if(factory.logged_in_user){
                return callback(factory.logged_in_user);
            }
            if(waiting){
                return $timeout(function(){
                    factory.isLoggedIn(callback);
                }, 500);
            }
            waiting = true;
            factory.isLoggedInRequest({}, function(data){
                factory.log_in_test_complete = true;
                factory.logged_in_user = data.logged_in_user;
                waiting = false;
                return callback(data.logged_in_user);
            })
        };

        factory.doLogout = function(){
            factory.logged_in_user = null;
            factory.logout();
        };

        factory.setLoggedInUser = function(user){
            factory.logged_in_user = user;
        };

        factory.getLoggedInUser = function(){
            factory.logged_in_user = user;
        };
        return factory;
    }]);