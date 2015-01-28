'use strict';
var api_path = '/api/';

var services = angular.module('myApp.services', ['ngResource']);

services.factory('IsLoggedIn', ['$resource',
    function($resource){
        return $resource('/mock_api/is_logged_in.json', {}, {
            query: {method:'GET', params:{}}
        });
    }]);

services.factory('IslandSrv', ['$resource',
    function($resource){
        return $resource(api_path+'/island_list.json', {}, {
            query: {method:'GET', params:{}},
        });
    }]);