'use strict';


angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
    'ui.grid',
    'myApp.services',
    'myApp.directives',
    'loginModule',
    'myApp.controllers',
    // 'apartmentModule',
    'fileModule'

])
    .config(['$routeProvider',function($routeProvider,$rootScope){
        $routeProvider.when('/',{
            templateUrl:'partials/welcomeView.html'
        });
        $routeProvider.when('/home',{
            templateUrl:'partials/welcomeView.html'
        });
        $routeProvider.when('/myfiles/:userID',{
            templateUrl:function(params){
                if(angular.isUndefined(params.userID)){
                    return 'partials/welcomeView.html'
                }
                else {
                    return 'partials/fileList.html'
                }
            },
            controller:'FileListController'
        });
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

