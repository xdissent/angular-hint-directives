module.exports = function(scopeElements, options) {
  return scopeElements.map(ddLib.getFailedAttributesOfElement.bind(null,options))
    .filter(function(x) {return x;});
};
