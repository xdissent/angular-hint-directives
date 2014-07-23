'use strict';

//var ddLib = require('./dd-lib/dd-lib');
var customDirectives = [];

var hintLog = angular.hint = require('angular-hint-log');
var camelize = require('camelize');
var search = require('./lib/search');
var ddLibData = require('./lib/ddLib-data');
var checkPrelimErrors = require('./lib/checkPrelimErrors');
var getKeysAndValues = require('./lib/getKeysAndValues');
var defaultDirectives = ddLibData.directiveTypes['angular-default-directives'].directives;
var htmlDirectives = ddLibData.directiveTypes['html-directives'].directives;

angular.module('ngHintDirectives', ['ngLocale'])
  .config(['$provide', function($provide) {
    $provide.decorator('$compile', ['$delegate', function($delegate) {
      return function(elem) {
        var messages = [];
        for(var i = 0; i < elem.length; i+=2) {
          if(elem[i].getElementsByTagName) {
            var toSend = Array.prototype.slice.call(elem[i].getElementsByTagName('*'));
            var result = search(toSend, customDirectives);
            messages = messages.concat(result);
          }
        }
        return $delegate.apply(this, arguments);
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
          var propDashed = camelize(prop);
          if(isNaN(+propDashed) &&
              !defaultDirectives[propDashed] &&
              !htmlDirectives[propDashed]) {

            var matchRestrict = dirsObj[prop].toString().match(/restrict:\s*'(.+?)'/) || 'ACME';
            ddLibData.directiveTypes['angular-default-directives']
                .directives[propDashed] = matchRestrict[1];

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

    checkPrelimErrors(directiveName,factoryStr);

    var pairs = getKeysAndValues(factoryStr);
    pairs.map(function(pair){customDirectives.push(pair);});

    var matchRestrict = factoryStr.match(/restrict:\s*'(.+?)'/);
    var restrict = matchRestrict[1] || 'ACME';
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
