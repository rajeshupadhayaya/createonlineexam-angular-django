'use strict';

var appDirective = angular.module('appDirective', []);


appDirective.directive('modal',function(){
	
	return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
	
	
});

appDirective.directive('passwordMatch', function(){
    return{
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var firstPassword = '#' + attrs.passwordMatch;
            elm.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elm.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);

                });
            });


        }
    }

});

appDirective.directive('imageUpload', function(){
    return {
        restrict: 'E',
        scope: {
            src: '=',
            ngModel: '='
        },
        link: function (scope, element, attrs) {
            if(!scope.src) { return; }

            var c = new Croppie(element[0], {
                viewport: {
                    width: 200,
                    height: 200
                },
                update: function () {
                    c.result('canvas').then(function(img) {
                        scope.$apply(function () {
                            scope.ngModel = img;
                        });
                    });
                }
            });

          // bind an image to croppie
            c.bind({
                url: scope.src
            });
        }
    };
});