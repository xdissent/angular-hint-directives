module.exports = function(scopeElements, customDirectives, options) {
  if(!Array.isArray(scopeElements)) {
    throw new Error('Function beginSearch must be passed an array.');
  }
  options = options || {};
  options.directiveTypes = options.directiveTypes ||
    ['html-directives','angular-default-directives','angular-custom-directives'];
  options.tolerance = options.tolerance || 4;
  if (customDirectives && customDirectives.length) {
    ddLib.setCustomDirectives(customDirectives);
  }
  var failedElements = ddLib.findFailedElements(scopeElements, options);
  var messages = ddLib.formatResults(failedElements);
  return messages;
};
