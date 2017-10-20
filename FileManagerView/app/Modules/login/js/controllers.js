'use strict';

/* Controllers */

angular.module('myApp.login.controllers', [])


   .controller('LoginController', function($scope,$uibModal,$rootScope,MainService,$location) {
       $scope.isLoggedin=MainService.isLoggedin;
       $scope.$on('loginDetailsUpdated',function(event,data){
           $scope.isLoggedin=MainService.isLoggedin;
       });
        $scope.open=function(){
            console.log('opening pop up');
            $rootScope.modalInstance=$uibModal.open({
                templateUrl:'Modules/login/login.html',
                controller:'SubmitController'
            });
        }
        $scope.close=function(){
            var res={};
            res.userID=undefined;
            res.firstname=undefined;
            res.lastname=undefined;
            res.isLoggedin=false;
            MainService.loginDetails(res);
            $location.path('/home');
        }


    })

    .controller('SubmitController', function ($scope,$http,RestService,$rootScope,toastr,MainService,$location) {
        $scope.user={};
        $scope.isError=false;
        $scope.errorMessage=null;
        $scope.isNewUser=false;
        $scope.newUser=function(){
            $scope.isNewUser=true;
        };

        $scope.signup=function () {
            if($scope.isNewUser===true && $scope.loginForm.$valid){
                $scope.isError=false;
                return RestService.post('User/InsertUser',$scope.user)
                    .then(function (res){
                        toastr.success("Sign Up Successful");
                        $rootScope.modalInstance.close();
                        $scope.isNewUser=false;
                    });
        }else{
                $scope.isError=true;
                $scope.errorMessage="Please correct below mentioned errors";
            }
        };

        $scope.loginUser=function () {

            if($scope.isNewUser===false && $scope.loginForm.$valid){
                $scope.isError=false;
                return RestService.post('User/loginUser',$scope.user)
                    .then(function (res) {
                        console.log(res);
                        toastr.info("Hello!!");
                        MainService.loginDetails(res);
                        $rootScope.modalInstance.close();
                    });
            }
            else{
                $scope.isError=true;
                $scope.errorMessage="Please correct below mentioned errors";
            }

        }

        $scope.onSubmit=function(){
            if($scope.isNewUser===true && $scope.loginForm.$valid){
                $scope.isError=false;
                 return RestService.post('User/verifyUserId',$scope.user)
                    .then(function(res){
                        if(res==true){
                            $scope.isError=true;
                            $scope.errorMessage="User ID already exist. Please choose another User ID";
                        }
                        else if(res == false){
                            $scope.isError=false;
                            return RestService.post('User/InsertUser',$scope.user)
                                .then(function (res){
                                    toastr.success("Sign Up Successful");
                                    $rootScope.modalInstance.close();
                                    $scope.isNewUser=false;
                                });
                        }
                    console.log(res)
                });
                 if(false){
                return RestService.post('User/InsertUser',$scope.user)
                    .then(function (res){
                        toastr.success("Sign Up Successful");
                        $rootScope.modalInstance.close();
                        $scope.isNewUser=false;
                    });
                 }
            }
            else if($scope.isNewUser===false && $scope.loginForm.$valid){
                $scope.isError=false;
                return RestService.post('User/loginUser',$scope.user)
                    .then(function (res) {
                        if(res==""){
                            $scope.isError=true;
                            $scope.errorMessage="Incorrect user ID or password";
                        }
                        else if(res.userID!=""){
                            toastr.info("Hello!! " + res.userID);
                            res.isLoggedin=true;
                            MainService.loginDetails(res);
                            $rootScope.modalInstance.close();
                            $location.path('myfiles/'+res.userID);
                        }

                    });
            }
            else{
                $scope.isError=true;
                $scope.errorMessage="Please correct below mentioned errors";
            }
        }
    });





