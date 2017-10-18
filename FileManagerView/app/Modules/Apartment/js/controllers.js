'use strict';

/* Controllers */

angular.module('myApp.apartment.controllers', [])

    .controller('ApartmentController', function($scope) {
        $scope.apartmentDetails=[
            {name:'Prashant Mansion',location:'Santaclara'},
            {name:'Mudrita Villa',location:'Sunnyvale'},
            {name:'Chintu homes',location:'MountainView'},
            {name:'Sweet House',location:'sunnyvale'}
            ];
        /*$scope.now = new Date();
        $scope.helloMessages = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'Hallo'];
        $scope.greeting = $scope.helloMessages[0];
        $scope.getRandomHelloMessage = function() {
            $scope.greeting = $scope.helloMessages[parseInt((Math.random() * $scope.helloMessages.length))];
        }*/
        })
