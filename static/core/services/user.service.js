'use strict';
var services = angular.module('coe.user.services', []);

services.factory('userService', userService);

userService.$inject = ['$http', '$cookies', '$rootScope'];

function userService($http, $cookies, $rootScope){
    var userService = {
        info:info,
        getTeacher : getTeacher

    };

    return userService;

    function info(){
        return info;
    }

    function getTeacher(){
        return $http.get('static/jsons/list.json').then(getTeacherSucessFn,getTeacherSucessErr);
    }

    function getTeacherSucessFn(data, headers, config){
        return data.data;
    }
    function getTeacherSucessErr(data, headers, config){
        console.error(data);
    }
}