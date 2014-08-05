var hasNameSpace = require('../lib/hasNameSpace');

describe('hasNameSpace', function() {
  it('should identify missing name spaces', function(){
    expect(hasNameSpace('nonamespace')).toBe(false);
    expect(hasNameSpace('yesNameSpace')).toBe(true);
    expect(hasNameSpace('ngNameSpace')).toBe(false);
  });
});