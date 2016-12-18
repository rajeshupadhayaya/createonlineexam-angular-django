'use strict';

var controllers = angular.module('homeController', ['ngAnimate','ngMaterial', 'ngMessages','ngAria','ngCookies']);


controllers.controller('home', ['$scope','$rootScope','$cookies',
	function($scope,$rootScope,$cookies){
		$scope.page='first page';
		$scope.isCollapsed = false;
		$rootScope.data = $cookies.getAll();
        $rootScope.isLoggedin = $rootScope.data.isLoggedin;

        if($rootScope.isLoggedin){
            $scope.userinfo = JSON.parse($rootScope.data.authenticatedAccount);
            $rootScope.name = $scope.userinfo.username;
            $rootScope.firstName = $scope.userinfo.first_name;
            $rootScope.lastName = $scope.userinfo.last_name;
            $rootScope.std_code = $scope.userinfo.std_code;
            $rootScope.phoneNo = $scope.userinfo.phone_num;
            $rootScope.dob = $scope.userinfo.date_of_birth;

            console.log($scope.name );
            $rootScope.profilePic = $scope.userinfo.profile_pic;
            console.log($scope.profilePic)
        }

        $scope.sendMessage = function(){
            console.log('message sent');
        }

	}

]);

controllers.controller('loginController',['$scope', '$http', '$location','$rootScope','Authentication',
	function($scope, $http,$location,$rootScope, Authentication){
		$rootScope.showModal = false;
      	$rootScope.isLoggedin = false;
        $rootScope.user = {};
        $rootScope.register = {};
        //$rootScope.errorDetail = 'no error';
        $scope.name='';


		$rootScope.openLogin  = function(){
				
			$rootScope.showModal = true;
			$rootScope.currentTemplate = '/login.html';
		};
			
		$rootScope.registerWithUsForm = function(){
				// $scope.showModal = !$scope.showModal;
			$rootScope.currentTemplate = '/registerWithUsForm.html';
		};
		$rootScope.lostPassword = function(){
				// $scope.showModal = !$scope.showModal;
			$rootScope.currentTemplate = '/lostPassword.html';
		};

        $rootScope.submitRegister = function (){
			console.log($rootScope.register);
            Authentication.register($rootScope.register)
                .then(function (response) {
                    console.log(response);
                    
                })

		};
        $rootScope.submitLogin = function (){
			Authentication.login($rootScope.user.username, $rootScope.user.password)
                .then(function(response){
                    if (response.status == 'Unauthorized') {
                        $rootScope.errorDetail = response.message;
                        var title='Invalid Login';
                        Notifier.error($rootScope.errorDetail,title);
                    }
                    else{
                        $rootScope.user = response;
                    }
                }, function(error){
                    $rootScope.user = {};
                    console.error(error);
                })
		};

        $rootScope.logout = function(){
            Authentication.logout();

        };


	}
]).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
 });

controllers.controller('examController', ['$scope', 
	function($scope){
		$scope.ques = {};
		$scope.titleName = 'Exam Create';
		$scope.firstPage= true;
		$scope.secondPage = false;
		$scope.showQuestion  = 0;

		// $scope.ques.noOfQues = 0;

		$scope.showQuesBlock = function(){
			$scope.firstPage= false;
			$scope.secondPage = true;
		};

		$scope.showMainBlock = function(){
			$scope.firstPage= true;
			$scope.secondPage = false;
		};


		$scope.range = function(count) {
			return Array.apply(0, Array(+count)).map(function(value,index){
			return index;
			});
		};

		$scope.nextQues = function(n){

			$scope.showQuestion = n + 1;
			console.log(n);
			// console.log($scope.showQuestion);
		};
		$scope.prevQues = function(n){

			$scope.showQuestion = n - 1;
			console.log(n);
			// console.log($scope.showQuestion);
		};

	}
]);

controllers.controller('dashboard', ['$scope','$location','Authentication','$rootScope','$cookies','$http','userService','$timeout',
    '$mdSidenav', '$log','$mdMedia','$mdDialog',

	function($scope,$location, Authentication, $rootScope, $cookies, $http,userService,$timeout,$mdSidenav, $log,$mdMedia,$mdDialog){
		//$scope.templateName = '';
        $scope.title = 'Create Online Exam';
        $scope.teachers ={};
        $scope.user={};
        $scope.toggleLeft = buildDelayedToggler('left');
		$scope.getMenu = JSON.parse($rootScope.data.layout);

        $scope.getTemplate = function(templateName){
            $scope.currentTemplate = 'static/templates/createonlineexam'+templateName + '.html';
        };
        $scope.getTemplate('/default');
        //$scope.currentTemplate = '/default.html';
        $scope.userinfo = JSON.parse($rootScope.data.authenticatedAccount);
        //console.log($scope.userinfo);
        $scope.test = 'test data';
        $scope.user.firstName = $scope.userinfo.first_name;
        $scope.user.lastName = $scope.userinfo.last_name;
        $scope.user.std_code = $scope.userinfo.std_code;
        $scope.user.dob = $scope.userinfo.date_of_birth;
        $scope.user.phoneNo = $scope.userinfo.phone_num;

        $scope.addTeacher = function(){

        };
        $scope.updateUserInfo = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

             $mdDialog.show({
                controller: userUpdate,
                //controller: userController,
                templateUrl: 'updateUserDetail.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            });
            //.then(function(answer) {
            //    $scope.status = 'You said the information was "' + answer + '".';
            //}, function() {
            //    $scope.status = 'You cancelled the dialog.';
            //});
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });

        };

        $scope.uploadPic = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

             $mdDialog.show({
                 //controller: imageUploadCtrl,
                templateUrl: 'uploadImage.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen,
                 //resolve:{
                 //    controllerscope:imageUploadCtrl()
                 //}
            });
            //.then(function(answer) {
            //    $scope.status = 'You said the information was "' + answer + '".';
            //}, function() {
            //    $scope.status = 'You cancelled the dialog.';
            //});
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: true,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };
        $scope.teacherList = false;
        $scope.selected = [];
        $scope.limitOptions = [5, 10, 15, {
            label: 'All',
            value: function () {
            return $scope.getList ? $scope.getList.count : 0;
            }
        }];

        $scope.query = {
            filter:'',
            order: 'nameToLower',
            limit: 5,
            page: 1
        };

        $scope.getTeacherList = function(){

            $scope.promise = userService.getTeacher().then(function(response){
            	$scope.getList = response;
            	//console.log($scope.getList);
            });

        };

        $scope.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.refreshList = function () {


            $scope.getTeacherList();
        };

        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.onPaginate = function(page, limit) {
            //console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
            //console.log('Page: ' + page + ' Limit: ' + limit);
            //
            //$scope.promise = $timeout(function () {
            //
            //}, 2000);
        };

        var bookmark;
        $scope.$watch('query.filter', function (newValue, oldValue) {
            if(!oldValue) {
              bookmark = $scope.query.page;
            }

            if(newValue !== oldValue) {
              $scope.query.page = 1;
            }

            if(!newValue) {
              $scope.query.page = bookmark;
            }

            $scope.getTeacherList();
        });

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        function buildDelayedToggler(navID) {
            return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle();
            }, 200);
        }
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
                }, wait || 10);
            };
        }


        function imageUploadCtrl($scope, $mdDialog){

            $scope.myImage='';
            $scope.myCroppedImage='';

            var handleFileSelect=function(ev) {
                console.log('trigger');
                var file=ev.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (ev) {
                    $scope.$apply(function($scope){
                    $scope.myImage=ev.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.saveImage = function () {
                Notifier.success("Image Uploaded Sucessfully");
                $mdDialog.hide();
            };
        }

        function userUpdate($scope, $mdDialog) {
            $scope.user = {};
            $scope.userinfo = JSON.parse($rootScope.data.authenticatedAccount);
            //console.log($scope.userinfo);
            $scope.user.username = $scope.userinfo.username;
            $scope.user.fullname = $scope.userinfo.first_name + ' ' +$scope.userinfo.last_name;
            $scope.user.firstName = $scope.userinfo.first_name;
            $scope.user.lastName = $scope.userinfo.last_name;
            $scope.user.emailid = $scope.userinfo.email;
            $scope.user.std_code= $scope.userinfo.std_code;
            $scope.user.phone_num = $scope.userinfo.phone_num;
            $scope.user.dob = new Date($scope.userinfo.date_of_birth);
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.saveUserDetails = function () {
                Notifier.success("Data Saved");
                $mdDialog.hide();
            };
        }
  	}
]);

controllers.controller('exams', ['$scope',
	function($scope){

	}
]);

controllers.controller('performance', ['$scope',
	function($scope){

	}
]);

controllers.controller('results', ['$scope',
	function($scope){

	}
]);

controllers.controller('payments', ['$scope',
	function($scope){

	}
]);
/*

controllers.controller('userController', ['$scope','$rootScope',
    function($scope,$rootScope){
        $scope.userinfo = JSON.parse($rootScope.data.authenticatedAccount);
        //console.log($scope.userinfo);
        $scope.username = $scope.userinfo.username;
        $scope.fullname = $scope.userinfo.first_name + ' ' +$scope.userinfo.last_name;
        $scope.firstName = $scope.userinfo.first_name;
        $scope.lastName = $scope.userinfo.last_name;
        $scope.emailid = $scope.userinfo.email;
        $scope.phoneno = $scope.userinfo.phone_no;
        $rootScope.showModal = false;
        $scope.uploadimage = '';
/!*

        $scope.editProfile = function editProfile(){
            $rootScope.showModal = true;
			$rootScope.currentTemplate = '/editProfile.html';
        };

        $scope.uploadImage = function (){
            $rootScope.showModal = true;
			$rootScope.currentTemplate = '/uploadimage.html';
        };

        $scope.upload = function(){

        };

        $scope.saveUserDetails= function () {
            console.log('data saved');
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };
*!/


    }
]);
*/
