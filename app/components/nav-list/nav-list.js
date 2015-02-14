angular.module('myApp.home', ['ngRoute'])
    .controller('navListCtrl', ['$scope', '$rootScope', 'IsLoggedIn', function($scope, $rootScope, IsLoggedIn) {
        $scope.nav_pages = [];
        IsLoggedIn.get({}, function(data) {
            $rootScope.logged_in = data.logged_in;
            if(data.logged_in){
                $scope.nav_pages = {'home':'home', 'settings':'settings', 'ranking':'ranking', 'alliance':'alliance',
                    'friends':'friends', 'events':'events', 'mail':'mail', 'logout':'logout'};
                $rootScope.logged_in_username = data.logged_in_username;
            }else{
                $scope.nav_pages = {'home':'home', 'register':'auth/register', 'login':'auth/login'};
            }
        });
    }]);