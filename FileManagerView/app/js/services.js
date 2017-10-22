'use strict';

/* Services */

angular.module('myApp.services', [])

    .service('MainService',function($rootScope){
        this.isLoggedin=false;
        this.loggedUser={};
        this.loginDetails=function(params){
            this.isLoggedin=params.isLoggedin;
            this.loggedUser.userID=params.userID;
            this.loggedUser.fName=params.firstname;
            this.loggedUser.lName=params.lastname;
            $rootScope.$broadcast('loginDetailsUpdated','update data everywhere');
            this.fileListUpdate();
        }
        this.fileListUpdate=function(){
            $rootScope.$broadcast('fileListUpdated','update list everywhere');
        }
    })

    .service ('RestService', function($http) {
        //this.baseUrl = 'http://localhost:8080/filemanager/';
        this.baseUrl = 'http://ec2-52-11-106-133.us-west-2.compute.amazonaws.com:8080/filemanager/';

        this.post = function (url, data, params) {
            var self = this;

            var params = params;

            if (!params) {
                params = {};
            }

            return $http({
                method: 'POST',
                url: self.baseUrl + url,
                data: data,
                params: params
            }).then(function (res) {
                return res.data;
            });
        };

        this.get = function (url, params) {
            var self = this;

            return $http({
                method: 'GET',
                url: self.baseUrl + url,
                params: params
            }).then(function (res) {
                return res.data;
            })
        };

        this.getwithouparams = function (url) {
            var self = this;

            return $http({
                method: 'GET',
                url: self.baseUrl + url,
                //params: params
            }).then(function (res) {
                return res.data;
            })
        };
    })

    .value('version', '0.1');
