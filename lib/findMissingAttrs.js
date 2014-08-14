var ddLibData = require('./ddLib-data');

module.exports = function(dirName, attributes) {
  attributes = attributes.map(function(x){return x.nodeName;});
  var directive = ddLibData.directiveTypes['angular-custom-directives'].directives[dirName];
  var missing = [];
  if (directive && directive.require) {
    for (var i = 0, length = directive.require.length; i < length; i++) {
      var dirName = directive.require[i].directiveName;
      if (attributes.indexOf(dirName) < 0) {
        missing.push(dirName);
      }
    }
  }
  return missing;
};
