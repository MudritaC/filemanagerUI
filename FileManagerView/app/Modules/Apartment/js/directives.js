'use strict';

/* Directives */


angular.module('myApp.apartment.directives', []).
directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);
