module.exports = function(customDirectives) {
  customDirectives.forEach(function(directive) {
    var directiveName = directive.directiveName.replace(/([A-Z])/g, '-$1').toLowerCase();
    ddLib.data.directiveTypes['angular-custom-directives']
      .directives[directiveName] = directive;
  });
};
