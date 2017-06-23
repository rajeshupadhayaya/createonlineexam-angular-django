'use strict';

var COEApp = angular.module("COEApp", ['ngResource','ngMessages', 'ngAnimate','ngRoute','homeController',
    'appDirective','ui.bootstrap','coe.auth.services','ui.router','coe.user.services','md.data.table','ngMdIcons',
    'satellizer','ngImgCrop']);


COEApp.config(['$stateProvider', '$urlRouterProvider','$routeProvider','$locationProvider','$httpProvider',

	function($stateProvider, $urlRouterProvider,$routeProvider, $locationProvider, Authentication){
		$routeProvider
			.when('/',{
                    //url: '/',
					templateUrl : '/static/templates/createonlineexam/home.html',
					controller : 'home'
			
			})
			.when('/create', {
                    //url: '/create',
					templateUrl : 'static/templates/createonlineexam/create_exam.html',
					controller : 'examController'
				
			})
			.when('/dashboard', {
                    //url: '/dashboard',
					templateUrl : 'static/templates/createonlineexam/dashboard.html',
					controller : 'dashboard',
                    resolve: {
                        loginRequired: loginRequired
                    }

			})
            .otherwise('/');

        //$urlRouterProvider.otherwise('/');
      
      	//$facebookProvider.setAppId('266804313655299').setPermissions(['email']);
			
		$locationProvider.html5Mode(true);
		// $locationProvider.hashPrefix('*');

        function skipIfLoggedIn($q, Authentication) {
            var deferred = $q.defer();
            if (Authentication.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function loginRequired($q, $location, $rootScope,$cookies) {
            var deferred = $q.defer();
            $rootScope.data = $cookies.getAll();

            $rootScope.isLoggedin = $rootScope.data.isLoggedin;
            $rootScope

            if ($rootScope.isLoggedin) {
                deferred.resolve();
            } else {
                $location.path('/');
            }
              return deferred.promise;
        }
	}
	
	

]);

// Initialize the application
COEApp.run(['$rootScope', '$window','$http','Authentication','$cookies',
    function($rootScope, $window ,$http, Authentication,$cookies) {
        //(function(d, s, id) {
        //  var js, fjs = d.getElementsByTagName(s)[0];
        //  if (d.getElementById(id)) return;
        //  js = d.createElement(s); js.id = id;
        //  js.src = "//connect.facebook.net/en_US/sdk.js";
        //  fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));
        ////
        //$rootScope.$on('fb.load', function() {
        //  $window.dispatchEvent(new Event('fb.load'));
        //});
        //$rootScope.on('$routeChangeStart', function(event){
        //    if(!Authentication.isAuthenticated()){
        //        event.preventDefault();
        //        $location.path('/');
        //    }
        //});

        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';



    }
]);

COEApp.constant('AUTH_EVENTS',{
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

COEApp.constant('USER_ROLES',{
    all: '*',
    student: 'student',
    teacher: 'teacher',
    university: 'university',
    school: 'school'
});