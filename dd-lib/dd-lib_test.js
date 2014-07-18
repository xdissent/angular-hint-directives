/* global describe */
/* global it */
/* global inject */
/* global module */
/* global require */
/* global expect */
'use strict';
describe('dd-app', function() {

  var ddLib = require('./dd-lib');

  describe('beginSearch()', function() {
    it('should throw if not passed an array', function() {
      var notAnArray = {};
      expect(function() {
        ddLib.beginSearch(notAnArray);
      }).toThrow('Function beginSearch must be passed an array.');
    });
    it('should return an array with the correct number of failed elements', function() {
      var elementsToTest = [
        {attributes: [{nodeName:'ng-ap'},{nodeName:'ng-hef'}], nodeName: 'DIV'},
        {attributes: [{nodeName:'ng-src'}], nodeName: 'DIV'},
        {attributes: [{nodeName:'ng-clic'}], nodeName: 'DIV'}
      ];
      var results = ddLib.beginSearch(elementsToTest);
      expect(results.length).toBe(3);
    });
    it('should return an array of objects that have match and error properties', function(){
      var elementsToTest = [
        {attributes: [{nodeName:'ng-clic'}], nodeName: 'DIV'}
      ];
      var result = ddLib.beginSearch(elementsToTest);
      expect(result[0]).toBe('There was an AngularJS error in DIV element. Found '+
        'incorrect attribute "ng-clic" try "ng-click".');
    });
  });

  describe('getFailedAttributes()', function() {
    var options = {
      directiveTypes:['angular-default-directives','html-directives'],
      tolerance: 4
    };
    it('should not find anything if nothing is wrong', function() {
      var elementToTest = [{nodeName:'id'},{nodeName:'ng-href'},{nodeName:'ng-show'}];
      var results = ddLib.getFailedAttributes(elementToTest,options);
      expect(results.length).toBe(0);
    });
    it('should find misspelled attributes in element', function() {
      var elementToTest = [{nodeName:'ng-ap'},{nodeName:'ng-hef'}];
      var results = ddLib.getFailedAttributes(elementToTest,options);
      expect(results[0].error).toBe('ng-ap');
      expect(results[1].error).toBe('ng-hef');
    });

    it('should identify mutually exclusive pairs of attributes', function() {
      var elementToTest = [{nodeName:'ng-show'},{nodeName:'ng-hide'}];
      var results = ddLib.getFailedAttributes(elementToTest,options);
      expect(results[0].typeError).toBe('mutuallyexclusive');

      elementToTest = [{nodeName:'ng-show'},{nodeName:'ng-click'}];
      results = ddLib.getFailedAttributes(elementToTest,options);
      expect(results.length).toBe(0);
    });

    it('should identify html event attributes', function() {
       var elementToTest = [{nodeName:'onclick'}];
       var results = ddLib.getFailedAttributes(elementToTest,options);
       expect(results[0].typeError).toBe('ngevent');
    });
  });

  describe('attributeExsistsInTypes', function() {
    var options = {
      directiveTypes:['angular-default-directives','html-directives','angular-custom-directives'],
      tolerance: 4
    };
    it('should identify attributes/directives that do not exsist', function(){
      var attrs = ['thisCouldntEvenBeReal','ng-clic',''];

      var result = ddLib.attributeExsistsInTypes(attrs[0],options);
      expect(result.typeError).toBe('nonexsisting');
      result = ddLib.attributeExsistsInTypes(attrs[1],options);
      expect(result.typeError).toBe('nonexsisting');
      result = ddLib.attributeExsistsInTypes(attrs[2],options);
      expect(result.typeError).toBe('nonexsisting');
    });
    it('should identify if attribute directives are used incorrectly', function(){
      ddLib.data.directiveTypes['angular-default-directives'].directives.fake = 'E';
      ddLib.data.directiveTypes['angular-default-directives'].directives.fake2 = 'C';
      var result = ddLib.attributeExsistsInTypes('fake',options);
      expect(result.typeError).toBe('wronguse');
      var result = ddLib.attributeExsistsInTypes('fake2',options);
      expect(result.wrongUse).toBe('class');
    });
    it('should identify if element directives are used incorrectly', function(){
      ddLib.data.directiveTypes['angular-custom-directives'].directives.fake = 'A';
      var result = ddLib.attributeExsistsInTypes('*fake',options);
      expect(result.wrongUse).toBe('attribute');
    });
  });

  describe('getSuggestions()', function() {
    it('should return an array of objects with the proper match for each error', function() {
      var failedAttr = 'ng-ap';
      var options = {
        directiveTypes:['angular-default-directives'],
        tolerance: 4
      };
      var result = ddLib.getSuggestions(failedAttr, options);
      expect(result.match).toBe('ng-app');
    });
  });

  describe('findClosestMatchIn()', function() {
    it('should throw if passed undefined or null', function() {
      expect(function() {
        ddLib.findClosestMatchIn({a:'',b:''},null);
      }).toThrow('Function must be passed a string as second parameter.');
      expect(function() {
        ddLib.findClosestMatchIn({a:''},undefined);
      }).toThrow('Function must be passed a string as second parameter.');
      expect(function() {
        ddLib.findClosestMatchIn('','toPass');
      }).toThrow('Function must be passed a defined object as first parameter.');
    });
    it('should find the closest match from list of given attributes', function() {
      var directiveTypeData = {'ng-src':'ng-src','ng-app':'ng-app','ng-click':'ng-click'};
      var attribute = 'ng-ap';
      var result = ddLib.findClosestMatchIn(directiveTypeData,attribute);
      expect(result.match).toBe('ng-app');
    });
  });

  describe('normalizeAttribute()', function() {
    it('should normalize attribute by stripping optional parameters', function() {
      var testAttrs = ['data:ng-click','x:ng:src','ng:href'];
      testAttrs = testAttrs.map(function(x){return ddLib.normalizeAttribute(x);});
      expect(testAttrs[0]).toBe('ng-click');
      expect(testAttrs[1]).toBe('ng-src');
      expect(testAttrs[2]).toBe('ng-href');
    });
  });

  describe('findMissingAttrs()', function(){
    it('should identify that there are no missing required attributes', function() {
      var attrs = [{nodeName:'ng-click'},{nodeName: 'a'}];
      ddLib.data.directiveTypes['angular-custom-directives'].directives['test'] =
        {
          require: [{directiveName:'a', restrict:'A'}]
        };
      var result = ddLib.findMissingAttrs('test',attrs);
      expect(result).toEqual([]);
    });
    it('should identify missing required attributes', function(){
      var attrs = [{nodeName:'ng-click'},{nodeName: 'id'}];
      ddLib.data.directiveTypes['angular-custom-directives'].directives['test'] =
        {
          require: [{directiveName:'a', restrict:'A'}]
        };
      var result = ddLib.findMissingAttrs('test',attrs);
      expect(result).toEqual(['a']);
    });
  });

  describe('getKeysAndValues()',function() {
    var factoryString, result;

    it('should get all directives created by isolated scope in directive factory', function() {
      factoryString = 'scope:{url:"="}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('url');

      factoryString = 'scope:{url:"=notUrl"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('notUrl');

      factoryString = 'scope:{url:"=", id:"@", notify:"&"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('url');
      expect(result[1].directiveName).toBe('id');
      expect(result[2].directiveName).toBe('notify');

      factoryString = 'scope:{url:"=a", id:"@b", notify:"&c"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('a');
      expect(result[1].directiveName).toBe('b');
      expect(result[2].directiveName).toBe('c');
    });
    it('should return empty array in case the are no pairs', function () {
      factoryString = 'scope: {}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result).toEqual([]);

      factoryString = 'scope: true';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result).toEqual([]);

      factoryString = '';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result).toEqual([]);

      factoryString = 'scope: {}, other: {url: "="}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result).toEqual([]);
    });
    it('should handle white spaces correctly in regexp', function () {
      factoryString = 'scope  :  {  url  :  "="  }';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('url');

    });
  });

  describe('formatResults()', function() {
    it('should display the correct message with respect to the correction found', function() {
      var failedElements = [{
        domElement:{id:'',nodeName:'HTML'},
        data: [{
          directiveType: 'angular-default-directives',
          error: 'ng-ap',
          match: 'ng-app',
          typeError: 'nonexsisting'
        }]
      }];
      var messages = ddLib.formatResults(failedElements);
      var display = 'There was an AngularJS error in HTML element. Found incorrect '+
        'attribute "ng-ap" try "ng-app".';
      expect(messages[0]).toBe(display);
    });
  });

  describe('setCustomDirectives()', function() {
    it('should set directives passed as custom directives', function() {
      var customDirs = [{directiveName:'testDir'}];
      ddLib.setCustomDirectives(customDirs);
      var result = ddLib.data.directiveTypes['angular-custom-directives'].directives['test-dir'];
      expect(result).toEqual({directiveName:'testDir'});
    });
  });

  describe('areSimilarEnough()', function() {
    var sim = ['hello','hellp'];
    var dif = ['asdfg','asqwre'];
    var far = ['hotdog','hamburgers'];
    var res1 = ddLib.areSimilarEnough(sim[0],sim[1]);
    var res2 = ddLib.areSimilarEnough(dif[0],dif[1]);
    var res3 = ddLib.areSimilarEnough(far[0],far[1]);
    expect(res1).toBe(true);
    expect(res2).toBe(false);
    expect(res3).toBe(false);
  });

  describe('levenshteinDistance()', function() {
    it('should only accept strings to be passed',function() {
      expect(function() {
        ddLib.levenshteinDistance(null,null);
      }).toThrow('Function must be passed two strings, given: object and object.');
      expect(function() {
        ddLib.levenshteinDistance(2,6);
      }).toThrow('Function must be passed two strings, given: number and number.');
      expect(function() {
        ddLib.levenshteinDistance(undefined,undefined);
      }).toThrow('Function must be passed two strings, given: undefined and undefined.');
    });
    it('should return the proper levenshtein distance between two strings', function() {
      var test1 = ddLib.levenshteinDistance('nf-ap','ng-app');
      var test2 = ddLib.levenshteinDistance('','');
      var bound1 = ddLib.levenshteinDistance('ng-onmouseo','ng-onmouseover');
      var bound2 = ddLib.levenshteinDistance('asdf','qwertyuiop');
      var bound3 = ddLib.levenshteinDistance('ng-href','ng-href');
      expect(test1).toBe(2);
      expect(test2).toBe(0);
      expect(bound1).toBe(3);
      expect(bound2).toBe(10);
      expect(bound3).toBe(0);
    });
  });

});







