var getFailedAttributes = require('../lib/getFailedAttributes');

describe('getFailedAttributes()', function() {
  var options = {
    directiveTypes:['angular-default-directives','html-directives'],
    tolerance: 4
  };
  it('should not find anything if nothing is wrong', function() {
    var elementToTest = [{nodeName: 'id'}, {nodeName: 'ng-href'}, {nodeName: 'ng-show'}];
    var results = getFailedAttributes(elementToTest,options);
    expect(results.length).toBe(0);
  });
  it('should find misspelled attributes in element', function() {
    var elementToTest = [{nodeName: 'ng-ap'}, {nodeName: 'ng-hef'}];
    var results = getFailedAttributes(elementToTest,options);
    expect(results[0].error).toBe('ng-ap');
    expect(results[1].error).toBe('ng-hef');
  });

  it('should identify mutually exclusive pairs of attributes', function() {
    var elementToTest = [{nodeName: 'ng-show'}, {nodeName: 'ng-hide'}];
    var results = getFailedAttributes(elementToTest,options);
    expect(results[0].typeError).toBe('mutuallyexclusive');

    elementToTest = [{nodeName: 'ng-show'}, {nodeName: 'ng-click'}];
    results = getFailedAttributes(elementToTest,options);
    expect(results.length).toBe(0);
  });

  it('should identify if ngRepeat does not match "track by PROP_NAME | filter:VAR_NAME" structure', function() {
    var elementToTest = [{nodeName: 'ng-repeat', value: 'i in items | filter:search track by id'}];
    var results = getFailedAttributes(elementToTest, options);
    expect(results.length).toBe(0);

    elementToTest = [{nodeName: 'ng-repeat', value: 'i in items filter:search'}];
    results = getFailedAttributes(elementToTest, options);
    expect(results[0].suggestion).toBe('Try: " | filter:search"');

    elementToTest = [{nodeName: 'ng-repeat', value: 'i in items | track by id filter:search'}];
    results = getFailedAttributes(elementToTest, options);
    expect(results[0].suggestion).toBe('Try: " | filter:search track by id"');

    elementToTest = [{nodeName: 'ng-repeat', value: 'i in items filter:search track by id'}];
    results = getFailedAttributes(elementToTest, options);
    expect(results[0].suggestion).toBe('Try: " | filter:search track by id"');
  });

  it('should identify html event attributes', function() {
     var elementToTest = [{nodeName: 'onclick'}];
     var results = getFailedAttributes(elementToTest,options);
     expect(results[0].typeError).toBe('ngevent');
  });
});