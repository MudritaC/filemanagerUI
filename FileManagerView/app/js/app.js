'use strict';

/*angular.module('myApp', [
    'myApp.controllers','apartmentModule'
]);*/
// Declare app level module which depends on filters, and services
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
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home',{
            templateUrl:'partials/welcomeView.html',
            controller:'view1Controller'
        });
        $routeProvider.when('/myfiles',{
            // templateUrl: function(params) {
            //      return params.isLoggedin == 'true' ? 'partials/fileList.html' : 'partials/welcomeView.html';
            // },
            templateUrl:'partials/fileList.html',
            controller:'FileListController',
            isloggedin:true
            // resolve:{
            //     mess:function($location){
            //         var t=$rootScope.isLoggedin;
            //         if(t==true){
            //             $location.path('partials/fileList.html');
            //         }
            //     }
            // }
        });
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
    // .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    //     $routeProvider.when('/view1',
    //         {controller: 'view1Controller',
    //         templateUrl: 'partials/welcomeView.html' })
    //         .when('/view2',{
    //             controller:'MyCtrl1',
    //             templateUrl:'partials/partial1.html'
    //         });
        // $routeProvider.when('/view2/:firstname/:lastname', {controller: 'MyCtrl2',
        // templateUrl: 'partials/partial2.html'});
  //$routeProvider.otherwise({redirectTo: '/view1'});
  // $locationProvider.html5Mode(true);
// }]);
