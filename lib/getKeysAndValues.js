module.exports = function(str) {
  var customDirectives = [],
      pairs = [],
      SCOPE_REGEXP = /scope\s*:\s*{\s*[^}]*['"]\s*}/,
      PROPERTY_REGEXP = /\w+\s*:\s*['"][a-zA-Z=@&]+['"]/g,
      KEYVAL_REGEXP = /(\w+)\s*:\s*['"](.+)['"]/;
  var matchScope = str.replace(/\n/g,'').match(SCOPE_REGEXP);
  var propertiesMatch = matchScope ? matchScope[0].match(PROPERTY_REGEXP) : undefined;

  if (matchScope && propertiesMatch) {
    propertiesMatch.map(function(str){
      var temp = str.match(KEYVAL_REGEXP);
      pairs.push({key: temp[1], value: temp[2]});
    });
    pairs.forEach(function(pair){
      var name = (['=', '@', '&'].indexOf(pair.value) !== -1)? pair.key : pair.value.substring(1);
      customDirectives.push({directiveName: name , restrict:'A'});
    });
  }
  return customDirectives;
};
