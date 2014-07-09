'use strict';

var ddLib = require('./dd-lib/dd-lib');
var customDirectives = [];


angular.module('ngHintDirectives', ['ngLocale'])
  .config(['$provide', function($provide) {
    $provide.decorator('$compile', ['$delegate','$timeout', function($delegate, $timeout) {
      return function(elem) {
        var messages=[];
        for(var i = 0; i < elem.length; i+=2){
          if(elem[i].getElementsByTagName){
            var toSend = Array.prototype.slice.call(elem[i].getElementsByTagName('*'));
            var result = ddLib.beginSearch(toSend,customDirectives);
            messages = messages.concat(result);
          }
        }
        if(messages.length) {
          console.groupCollapsed('Angular Hint: Directive');
          messages.forEach(function(error) {
            console.warn(error.message);
            console.log(error.domElement);
          })
          console.groupEnd();
        }
        return $delegate.apply(this,arguments);
      };
    }]);
  }]);
angular.module('ngLocale').config(function($provide) {
  var originalProvider = $provide.provider;
  $provide.provider = function(token, provider) {
    var provider = originalProvider.apply($provide, arguments);
    if (token === '$compile') {
      var originalProviderDirective = provider.directive;
      provider.directive = function(dirsObj) {
        for(var prop in dirsObj){
          var propDashed = ddLib.camelToDashes(prop);
          if(isNaN(+propDashed) &&
            !ddLib.directiveDetails.directiveTypes['angular-default-directives'].directives[propDashed] &&
            !ddLib.directiveDetails.directiveTypes['html-directives'].directives[propDashed]) {
            var matchRestrict = dirsObj[prop].toString().match(/restrict:\s*'(.+?)'/) || 'ACME';
            ddLib.directiveDetails.directiveTypes['angular-default-directives']
              .directives[propDashed] = matchRestrict[1];
          }
        };
        return originalProviderDirective.apply(this, arguments);
      };
    }
    return provider;
  }
})
var originalAngularModule = angular.module;
angular.module = function() {
  var module = originalAngularModule.apply(this, arguments);
  var originalDirective = module.directive;
  module.directive = function(directiveName, directiveFactory) {
    var originalDirectiveFactory = typeof directiveFactory === 'function' ? directiveFactory :
        directiveFactory[directiveFactory.length - 1];
    var directive = {directiveName: directiveName, restrict: 'AE'}
    customDirectives.push(directive);
    var matchRestrict = originalDirectiveFactory.toString().match(/restrict:\s*'(.+?)'/);
    var matchScope = originalDirectiveFactory.toString().match(/scope:\s*?{\s*?(\w+):\s*?'(.+?)'/);
    if(matchScope) {
      var name = (matchScope[2]=='=')? matchScope[1] : matchScope[2].substring(1);
      customDirectives.push({directiveName: name , restrict:'A'})
    }
    if (matchRestrict) {
      directive.restrict = matchRestrict[1];
    }
    arguments[1][0] = function () {
      var ddo = originalDirectiveFactory.apply(this, arguments);
      directive.restrict = ddo.restrict || 'A';
      return ddo;
    };
    return originalDirective.apply(this, arguments);
  };
  return module;
}

