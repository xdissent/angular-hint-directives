'use strict';

var hintLog = angular.hint;
describe('ddLib and Angular Integration Test', function() {

  beforeEach(module('ngHintDirectives'));

  describe('Decorator: $rootScope', function() {
    var $rootScope, $compile;

    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      hintLog.onMessage = jasmine.createSpy('onMessage');
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
      expect(hintLog.onMessage).toHaveBeenCalledWith('There was an AngularJS error in DIV element. Found incorrect attribute "ng-cick" try "ng-click".');
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

  describe('angular.module Decorator', function() {
    var $rootScope, $compile;

    beforeEach(inject(function() {
      angular.module('testModule',[]).directive('testDirective', [function() {
        return {
          restrict: 'CE',
          template: '<h3>This is Test Directive</h3>',
          scope: {info:'='}
        };
      }]);
    }));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      hintLog.onMessage = jasmine.createSpy('onMessage');
    }));
    it('should log error if custom directive is misspelled', function() {
      var html2 = '<div id="outer2"><div></div><p id="toFailTest" tst-dirctive=""></p></div>';
      var element2 = angular.element(html2);
      $compile(element2)($rootScope);
      $rootScope.$apply();
      expect(hintLog.onMessage).toHaveBeenCalledWith('There was an AngularJS error in P element with '+
        'id: #toFailTest. Found incorrect attribute "tst-dirctive" try "test-directive".');
    });
    it('should log error if custom directive is used incorrectly based on restrict', function() {
      var html3 = '<div id="outer3"><p id="toFailTest3" test-directive=""></p></div>';
      var element3 = angular.element(html3);
      $compile(element3)($rootScope);
      $rootScope.$apply();
      expect(hintLog.onMessage).toHaveBeenCalledWith('There was an AngularJS error in P element with '+
        'id: #toFailTest3. Attribute name "test-directive" is reserved for element and class'+
        ' names only.');
    });
  });
});
