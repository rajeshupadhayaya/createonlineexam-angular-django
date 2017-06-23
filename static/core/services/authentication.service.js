'use strict';
var services = angular.module('coe.auth.services', []);

services.factory('Authentication', Authentication);

Authentication.$inject = ['$http', '$cookies', '$rootScope'];

function Authentication($http, $cookies, $rootScope) {

    var Authentication = {
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        isLoggedin:isLoggedin,
        login: login,
        logout: logout,
        register: register,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate,
        getLayout: getLayout
    };

    return Authentication;

    function isLoggedin(account){
        $rootScope.isLoggedin = true;
        $cookies.put('authenticatedAccount' , JSON.stringify(account));
        $cookies.put('isLoggedin',$rootScope.isLoggedin);
    }

    function register(user) {
        return $http.post('/api/v1/accounts/', user)
            .then(registerSuccessFn, registerErrorFn);
    }

    function registerSuccessFn(data, headers, config) {
        Authentication.login(data.data.email, data.data.password);
    }

    function registerErrorFn(data, headers, config) {
        return data.data;
    }

    function login(username, password){
        return $http.post('/api/v1/auth/login/', {email:username, password:password})
            .then(loginSuccessFn, loginErrorFn);
    }

    function loginSuccessFn(data, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        isLoggedin(data.data);
        // console.log(data.data.user_type);
        getLayout(data.data.user_type);
        window.location = '/dashboard';
    }

    function loginErrorFn(data, headers, config) {
        return data.data;
    }

    function logout(){
        return $http.post('/api/v1/auth/logout/')
            .then(logoutSuccessFn, logoutErrorFn);
    }

    function logoutSuccessFn(data, headers, config){
        Authentication.unauthenticate();
        $cookies.remove('isLoggedin');
        $cookies.remove('authenticatedAccount');
        $cookies.remove('layout');

        window.location = '/';
    }

    function logoutErrorFn(data, headers, config) {
        return data.data;
    }

    function getAuthenticatedAccount() {
        if (!$cookies.authenticatedAccount) {
            return;
        }
        isLoggedin();
        return JSON.parse($cookies.authenticatedAccount);
    }

    function isAuthenticated() {
        //return $cookies.getAll('authenticatedAccount');
        return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccount(account) {
        //$cookies.put('authenticatedAccount' , JSON.stringify(account));
        isAuthenticated(account);
        $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unauthenticate() {
        delete $cookies.authenticatedAccount;
    }

    function getLayout(user_type){
        //console.log(user_type);
        return $http.get('/api/v1/auth/layout/'+user_type+ '/ ')
            .then(layoutSuccessFn, layoutFailErr);
    }

    function layoutSuccessFn(data, headers, config){
        //console.log(data.data[0].view_details);
        //$scope.temp = data.data[0].view_details;
        $cookies.put('layout', data.data[0].view_details);
        //console.log(data.data);
        return data.data[0].view_details;
    }

    function layoutFailErr(data, headers, config){
        return data.data;
    }

}



