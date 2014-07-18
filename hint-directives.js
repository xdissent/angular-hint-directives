'use strict';

var ddLib = require('./dd-lib/dd-lib');
var RESTRICT_REGEXP = /restrict\s*:\s*['"](.+?)['"]/;
var customDirectives = [];

angular.module('ngHintDirectives', ['ngLocale'])
  .config(['$provide', function($provide) {
    $provide.decorator('$compile', ['$delegate', function($delegate) {
      return function(elem) {
        var messages=[];
        elem = angular.element(elem);
        for(var i = 0; i < elem.length; i+=2){
          if(elem[i].getElementsByTagName){
            var toSend = Array.prototype.slice.call(elem[i].getElementsByTagName('*'));
            var result = ddLib.beginSearch(toSend,customDirectives);
            messages = messages.concat(result);
          }
        }
        return $delegate.apply(this,arguments);
      };
    }]);
  }]);
angular.module('ngLocale').config(function($provide) {
  var originalProvider = $provide.provider;
  $provide.provider = function(token, provider) {
    provider = originalProvider.apply($provide, arguments);
    if (token === '$compile') {
      var originalProviderDirective = provider.directive;
      provider.directive = function(dirsObj) {
        for(var prop in dirsObj){
          var propDashed = ddLib.dasherize(prop);
          if(isNaN(+propDashed) &&
            !ddLib.data.directiveTypes['angular-default-directives'].directives[propDashed] &&
            !ddLib.data.directiveTypes['html-directives'].directives[propDashed]) {
            var matchRestrict = dirsObj[prop].toString().match(RESTRICT_REGEXP);
            ddLib.data.directiveTypes['angular-default-directives']
              .directives[propDashed] = (matchRestrict && matchRestrict[1]) || 'A';
          }
        }
        return originalProviderDirective.apply(this, arguments);
      };
    }
    return provider;
  };
});
var originalAngularModule = angular.module;
angular.module = function() {
  var module = originalAngularModule.apply(this, arguments);
  var originalDirective = module.directive;
  module.directive = function(directiveName, directiveFactory) {
    var originalDirectiveFactory = typeof directiveFactory === 'function' ? directiveFactory :
        directiveFactory[directiveFactory.length - 1];
    var factoryStr = originalDirectiveFactory.toString();

    ddLib.checkPrelimErrors(directiveName,factoryStr);

    var pairs = ddLib.getKeysAndValues(factoryStr);
    pairs.map(function(pair){customDirectives.push(pair);});

    var matchRestrict = factoryStr.match(RESTRICT_REGEXP);
    var restrict = (matchRestrict && matchRestrict[1]) || 'A';
    var directive = {directiveName: directiveName, restrict: restrict,  require:pairs};
    customDirectives.push(directive);

    arguments[1][0] = function () {
      var ddo = originalDirectiveFactory.apply(this, arguments);
      directive.restrict = ddo.restrict || 'A';
      return ddo;
    };
    return originalDirective.apply(this, arguments);
  };
  return module;
};