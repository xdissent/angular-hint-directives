var hasNameSpace = require('../lib/hasNameSpace');

describe('hasNameSpace', function() {
  it('should identify missing name spaces', function(){
    expect(hasNameSpace('nonamespace')).toBe(false);
  });
});