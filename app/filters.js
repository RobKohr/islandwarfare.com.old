angular.module('myApp').filter('keepSorted', function () {

    'use strict';
    /*
     * When you pass an object into ng-repeat, it sorts it by alphabetical order by
     * default. This overrides it and keeps them sorted the way the object was defined.
     */
    return function(input) {
        if (!input) {
            return [];
        }
        return Object.keys(input);
    };

});
