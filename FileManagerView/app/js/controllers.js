'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('FileListController', function($scope,$http,RestService,MainService,$uibModal,$rootScope,$timeout) {
        var linkCellTemplate = '<div class="ui-grid-cell-contents"><a href="{{ COL_FIELD }}">Download File</a></div>';
        var deleteButtonTemplate='<button ng-click="grid.appScope.deleteRow(row.entity)">Delete</button>';
        var updateButtonTemplate='<button ng-click="grid.appScope.updateRow(row.entity)">Update</button>';
        $scope.refresh = true;
        $scope.user={};
        $scope.user.userID=MainService.loggedUser.userID;

        $scope.init=function(){
            $scope.getFilelist();
        };

        var refresh = function() {
            $scope.refresh = true;
            $timeout(function() {
                $scope.refresh = false;
            }, 0);
        };

        $scope.fileList=[{}];
        $scope.gridOptions=[{}];
        $scope.getFilelist = function(){
            $scope.refresh = false;
            RestService.post('File/viewFilesForUser',$scope.user)
                .then(function(data){
                    $scope.fileList=data;


                    $scope.gridOptions={data: 'fileList',
                        columnDefs: [
                            {field:'fileName', displayName:'File Name'},
                            {field:'fileDsc', displayName:'Description'},
                            {field:'userId', displayName:'Author'},
                            {field:'createdDate',displayName:'Created On'},
                            {field:'modifiedDate', displayName:'Modified On'},
                            {field:'fileUrl', displayName:'File Link', cellTemplate:linkCellTemplate},
                            {field:'version', displayName:'Version',width: 150},
                            {field:'del',displayName:'',width: 150,cellTemplate:deleteButtonTemplate},
                            {field:'edit',displayName:'',width: 150,cellTemplate:updateButtonTemplate}]};
                    console.log($scope.gridOptions);
                });
            refresh();

        };

        $scope.$on('fileListUpdated',function(event,data){
            $scope.getFilelist();

        });

        $scope.deleteRow = function(row){
            RestService.post('File/s3DeleteFile',row)
                .then(function(res){
                    MainService.fileListUpdate();
                console.log(res)
            });
            console.log(row)
        }

        $scope.updateRow = function(row){
            console.log(row);

            $scope.openUpdatePopup=function(){
                $rootScope.modalInstance=$uibModal.open({
                    templateUrl:'Modules/file/updateFile.html',
                    controller:'FileUpdateController',
                    resolve: {
                        rowData: function() {
                            return row
                        }
                    }
                });
            }
            $scope.openUpdatePopup();
        }

    })
    .controller('MainController',function($scope,MainService,$rootScope){

        // $scope.init=function(){
        //     $scope.isLoggedin=MainService.isLoggedin;
        // }

        $rootScope.isLoggedin=MainService.isLoggedin;
        $scope.userNameTest=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
        $scope.$on('loginDetailsUpdated',function(event,data){
            $scope.userNameTest=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
            $rootScope.isLoggedin=MainService.isLoggedin;
            console.log($rootScope.isLoggedin);
        })
    })

    .controller('RouteController',function($scope,$location){
                $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {

                    if (newUrl.requireAuth && !session.user) {
                        // User isn’t authenticated
                        $location.path("/login");
                    }

                });
    })

    .controller('view1Controller',function($scope){
        console.log("view1 loaded");
        $scope.message="Hello world";
    })

    .controller('MyCtrl1', function($scope,$location) {
        $scope.loadview2=function(){
            $location.path('/view2/'+$scope.firstname+'/'+$scope.lastname);
        }
    })



  .controller('MyCtrl2', function($scope,$routeParams) {
      $scope.firstname=$routeParams.firstname;
      $scope.lastname=$routeParams.lastname;
  });