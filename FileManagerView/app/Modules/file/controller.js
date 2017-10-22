'use strict';

/* Controllers */

angular.module('myApp.file.controllers', [])

    .controller('UploadPopUpController', function($scope,$uibModal,$rootScope) {
        $scope.open=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl:'Modules/file/uploadFile.html',
                controller:'FileUploadController'
            });
        }


    })

    .controller('FileUploadController', function ($scope,$http,RestService,$rootScope,toastr,MainService) {

        $scope.fileInfo={};
        $scope.isError=false;
        $scope.errorMessage=null;
        $scope.fileInfo.userId=MainService.loggedUser.userID;
        $scope.fileInfo.version="1";

        $scope.cancelUpload = function(){
            $rootScope.modalInstance.close();
        }

            $scope.uploadFile = function(){
                if(angular.isUndefined($scope.myfile)){
                    $scope.isError=true;
                    $scope.errorMessage="Please choose a file";
                }
                else if($scope.myfile.size >10000000){
                    $scope.isError=true;
                    $scope.errorMessage="File size should not be greater than 10 MB";
                }
                else if(!$scope.uploadFileForm.$valid){
                    $scope.isError=true;
                    $scope.errorMessage="Please correct below mentioned errors";
                }else {
                    toastr.info("File upload is in progress...");
                    var fd = new FormData();
                    fd.append('file',$scope.myfile);
                    fd.append('name',$scope.fileInfo.fileName);

                    //$http.post('http://localhost:8080/filemanager/File/s3UploadFiles',fd,{transformRequest: angular.identity,
                    $http.post('http://ec2-52-11-106-133.us-west-2.compute.amazonaws.com:8080/filemanager/File/s3UploadFiles',fd,{transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}})
                        .then(function (res) {
                            if(res.data.status=="SUCCESS"){
                                return RestService.post('File/insertFile', $scope.fileInfo)
                                    .then(function (dbresp) {
                                        MainService.fileListUpdate();
                                        toastr.success("File uploaded successfully");
                                    })
                                    .catch(function (dbresp){
                                        toastr.error("Oops!! something went wrong. Please try after sometime");
                                    });
                            }
                        });
                    $rootScope.modalInstance.close();
                }
                }
    })

    .controller('FileUpdateController', function ($scope,$http,RestService,$rootScope,toastr,MainService,rowData) {
        $scope.isError=false;
        $scope.updateFileInfo={};
        $scope.updateFileInfo.fileId=rowData.fileId;
        $scope.updateFileInfo.fileName=rowData.fileName;
        $scope.updateFileInfo.fileDsc=rowData.fileDsc;
        $scope.updateFileInfo.version=rowData.version + 1;
        $scope.updateFileInfo.userId=MainService.loggedUser.userID;

        $scope.cancelEdit = function(){
            $rootScope.modalInstance.close();
        }

        $scope.editFile = function(){
            if(angular.isUndefined($scope.myfile)){
                $scope.isError=true;
                $scope.errorMessage="Please choose a file";
            }
            else{
                toastr.info("File update is in progress...");
                var fd = new FormData();
                fd.append('file',$scope.myfile);
                fd.append('fileDesc',$scope.updateFileInfo.fileDsc);
                fd.append('userId',$scope.updateFileInfo.userId);
                fd.append('fileName',$scope.updateFileInfo.fileName);
                fd.append('version',$scope.updateFileInfo.version);



                //$http.post('http://localhost:8080/filemanager/File/s3UpdateFiles',fd,{transformRequest: angular.identity,
                $http.post('http://ec2-52-11-106-133.us-west-2.compute.amazonaws.com:8080/filemanager/File/s3UpdateFiles',fd,{transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}})
                    .then(function (res) {
                        $rootScope.modalInstance.close();
                        if(res.data.status=="SUCCESS"){
                            toastr.success("File uploaded successfully");
                            MainService.fileListUpdate();
                        }})
                    .catch(function (){
                            if(res.data.status=="FAILURE"){
                            toastr.error("Oops!! something went wrong. Please try after sometime");
                        }
                    }
                )}
        }

});