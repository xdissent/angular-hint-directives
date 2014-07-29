'use strict';

var hintLog = angular.hint;

describe('ddLib and Angular Integration Test', function() {

  beforeEach(module('ngHintDirectives'));
  beforeEach(inject(function(){
    hintLog.onMessage = jasmine.createSpy('onMessage');
  }));

  describe('Decorator: $rootScope', function() {
    var $rootScope, $compile;

    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

    it('should have no return no errors if there are none', function() {
      var html = '<div id="topTest"><div ng-click="">Testing</div><p ng-src="">Testing</p></div>';
      var element = angular.element(html);
      $compile(element)($rootScope);
      $rootScope.$apply();
      expect(hintLog.onMessage).not.toHaveBeenCalled();
    });

    it('should return the console.log the correct number of errors', function() {
      var html = '<div id="topTest"><div ng-cick="">Testing</div><p ng-src="">Testing</p></div>';
      var element = angular.element(html);
      $compile(element)($rootScope);
      $rootScope.$apply();
      expect(hintLog.onMessage).toHaveBeenCalledWith('##Directives## There was an AngularJS error in DIV element. Found incorrect attribute "ng-cick" try "ng-click".');
    });

    it('should ignore comment nodes', function() {
      var html = '<div id="topTest"><!-- ng-cick  this should not throw--></div>';
      var element = angular.element(html);
      $compile(element)($rootScope);
      expect(function() {
        $rootScope.$apply();
      }).not.toThrow();
    });
  });
  describe('angular.module Decorator', function () {
    it('should handle restrict regexp correctly', inject(function ($compile) {
      angular.module('testModule',[]).directive('testDirective', function() {
        return {
          restrict  :  "E"
        };
      });
      $compile('<div><div test-directive></div></div>');
      expect(hintLog.onMessage).toHaveBeenCalledWith('##Directives## There was an AngularJS error in DIV element. Attribute name "test-directive" is reserved for element names only.');
    }));

    it('should allow custom directives without "restrict"', inject(function ($compile) {
      angular.module('testModule',[]).directive('testDirective', function() {
        return {};
      });
      $compile('<div></div>');
      expect(hintLog.onMessage).not.toHaveBeenCalled();
    }));
  });
});
