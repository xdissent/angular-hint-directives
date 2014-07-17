module.exports = function(attribute, options) {
  var min_levDist = Infinity, match = '', dirType = '';
  options.directiveTypes.forEach(function(directiveType) {
    var isTag = attribute.charAt(0) === '*';
    var isCustomDir = directiveType === 'angular-custom-directives';
    if(!isTag || (isTag && isCustomDir)) {
      var directiveTypeData = ddLib.data.directiveTypes[directiveType].directives;
      var tempMatch = ddLib.findClosestMatchIn(directiveTypeData, attribute);
      if(tempMatch.min_levDist < options.tolerance && tempMatch.min_levDist < min_levDist) {
        match = tempMatch.match;
        dirType = directiveType;
        min_levDist = tempMatch.min_levDist;
      }
    }
  });
  return {match:match, directiveType:dirType};
};
