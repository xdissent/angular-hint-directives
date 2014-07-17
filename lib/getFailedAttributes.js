module.exports = function(attributes, options) {
  var failedAttrs = [], mutExPairFound = false;
  for(var i = 0; i < attributes.length; i++) {
    var attr = ddLib.normalizeAttribute(attributes[i].nodeName);
    var dirVal = ddLib.data.directiveTypes['html-directives'].directives[attr] || '';
    if(dirVal.indexOf('!') > -1) {
      failedAttrs.push({
        error: attr,
        directiveType: 'html-directives',
        typeError: 'ngevent'
      });
      continue;
    }
    if(!mutExPairFound && ddLib.isMutExclusiveDir(attr) && ddLib.hasMutExclusivePair(attr,attributes)) {
      failedAttrs.push({
        error: attr,
        directiveType: 'angular-default-directives',
        typeError: 'mutuallyexclusive'
      });
      mutExPairFound = true;
      continue;
    }
    var result = ddLib.attributeExsistsInTypes(attr,options);
    var suggestion = result.typeError === 'nonexsisting' ?
      ddLib.getSuggestions(attr,options) : {match:''};
    if(result.typeError) {
      failedAttrs.push({
        match: suggestion.match || '',
        wrongUse: result.wrongUse || '',
        error: attr,
        directiveType: suggestion.directiveType || 'angular-custom-directives',
        typeError: result.typeError
      });
    }
  }
  return failedAttrs;
};
