'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('FileListController', function($scope,$http,RestService,MainService,$uibModal,$rootScope,$timeout,toastr) {
        var linkCellTemplate = '<div class="ui-grid-cell-contents"><a href="{{ COL_FIELD }}">Download File</a></div>';
        var deleteButtonTemplate='<button ng-click="grid.appScope.deleteRow(row.entity)">Delete</button>';
        var updateButtonTemplate='<button ng-click="grid.appScope.updateRow(row.entity)">Update</button>';
        $scope.refresh = true;
        $scope.user={};
        $scope.user.userID=MainService.loggedUser.userID;
        $scope.userName=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
        $scope.isLoggedin=MainService.isLoggedin;

        $scope.init=function(){
            $scope.getFilelist();
        };

        $scope.$on('loginDetailsUpdated',function(event,data){
            $scope.userName=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
            $scope.isLoggedin=MainService.isLoggedin;
        });

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
                });
            refresh();

        };

        $scope.$on('fileListUpdated',function(event,data){
            $scope.getFilelist();

        });

        $scope.deleteRow = function(row){
            RestService.post('File/s3DeleteFile',row)
                .then(function(res){
                    toastr.success("File deleted successfully");
                    MainService.fileListUpdate();
            });
        }

        $scope.updateRow = function(row){

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
            };
            $scope.openUpdatePopup();
        }

    })
    .controller('MainController',function($scope,MainService,$rootScope){
        $rootScope.isLoggedin=MainService.isLoggedin;
        $scope.userNameTest=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
        $scope.$on('loginDetailsUpdated',function(event,data){
            $scope.userNameTest=MainService.loggedUser.fName + " " + MainService.loggedUser.lName;
            $rootScope.isLoggedin=MainService.isLoggedin;
        })
    })
;