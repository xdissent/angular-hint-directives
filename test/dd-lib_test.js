/* global describe it inject module require expect*/

'use strict';

describe('dd-app', function() {
  describe('findClosestMatchIn()', function() {
    it('should throw if passed undefined or null', function() {
      expect(function() {
        ddLib.findClosestMatchIn({a: '',b: ''},null);
      }).toThrow('Function must be passed a string as second parameter.');
      expect(function() {
        ddLib.findClosestMatchIn({a: ''},undefined);
      }).toThrow('Function must be passed a string as second parameter.');
      expect(function() {
        ddLib.findClosestMatchIn('','toPass');
      }).toThrow('Function must be passed a defined object as first parameter.');
    });
    it('should find the closest match from list of given attributes', function() {
      var directiveTypeData = {'ng-src': 'ng-src','ng-app': 'ng-app','ng-click': 'ng-click'};
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
      var attrs = [{nodeName: 'ng-click'}, {nodeName: 'a'}];
      ddLib.data.directiveTypes['angular-custom-directives'].directives['test'] =
        {
          require: [{directiveName: 'a', restrict: 'A'}]
        };
      var result = ddLib.findMissingAttrs('test',attrs);
      expect(result).toEqual([]);
    });
    it('should identify missing required attributes', function(){
      var attrs = [{nodeName: 'ng-click'}, {nodeName: 'id'}];
      ddLib.data.directiveTypes['angular-custom-directives'].directives['test'] =
        {
          require: [{directiveName: 'a', restrict: 'A'}]
        };
      var result = ddLib.findMissingAttrs('test',attrs);
      expect(result).toEqual(['a']);
    });
  });

  describe('getKeysAndValues()',function() {
    it('should get all directives created by isolated scope in directive factory', function() {
      var factoryString = 'scope:{url:"="}';
      var result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('url');

      factoryString = 'scope:{url:"=notUrl"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('notUrl');

      factoryString = 'scope:{url:"=", id:"@"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[1].directiveName).toBe('id');

      factoryString = 'scope:{url:"=a", id:"@b"}';
      result = ddLib.getKeysAndValues(factoryString);
      expect(result[0].directiveName).toBe('a');
      expect(result[1].directiveName).toBe('b');
    });
  });

  describe('formatResults()', function() {
    it('should display the correct message with respect to the correction found', function() {
      var failedElements = [{
        domElement:{id: '',nodeName: 'HTML'},
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
      var customDirs = [{directiveName: 'testDir'}];
      ddLib.setCustomDirectives(customDirs);
      var result = ddLib.data.directiveTypes['angular-custom-directives'].directives['test-dir'];
      expect(result).toEqual({directiveName: 'testDir'});
    });
  });

  describe('areSimilarEnough()', function() {
    var sim = ['hello','hellp'];
    var dif = ['asdfg','asqwre'];
    var far = ['hotdog','hamburgers'];
    var res1 = ddLib.areSimilarEnough(sim[0], sim[1]);
    var res2 = ddLib.areSimilarEnough(dif[0], dif[1]);
    var res3 = ddLib.areSimilarEnough(far[0], far[1]);
    expect(res1).toBe(true);
    expect(res2).toBe(false);
    expect(res3).toBe(false);
  });

  describe('levenshteinDistance()', function() {
    it('should only accept strings to be passed',function() {
      expect(function() {
        ddLib.levenshteinDistance(null, null);
      }).toThrow('Function must be passed two strings, given: object and object.');
      expect(function() {
        ddLib.levenshteinDistance(2, 6);
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
