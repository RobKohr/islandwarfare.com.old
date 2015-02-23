angular.module('myApp')
    .controller('navListCtrl', ['$scope', '$rootScope', 'authService', function($scope, $rootScope, authService) {
        $scope.nav_pages = [];
        authService.isLoggedIn({}, function(data) {
            console.log(data);
            $scope.logged_in_user = $rootScope.logged_in_user = data.logged_in_user;
            $scope.logout = function(){
                authService.doLogout();
                $scope.logged_in_user = $rootScope.logged_in_user = data.logged_in_user = null;
            };
            $scope.logged_in_nav_pages = {'home':'home', 'settings':'settings', 'ranking':'ranking', 'alliance':'alliance',
                'friends':'friends', 'events':'events', 'mail':'mail', 'logout':'logout'};
            $scope.logged_out_nav_pages = {'home':'home', 'register':'auth/register', 'login':'auth/login'};

        });
    }]);