var hintLog = require('angular-hint-log'),
  MODULE_NAME = 'Directives',
  SEVERITY_SUGGESTION = 3;

module.exports = function(directiveName) {
  var message = 'Directive "'+directiveName+'" should have proper namespace try adding a prefix'+
    ' and/or using camelcase.';
  var domElement = '<'+directiveName+'> </'+directiveName+'>';
  hintLog.logMessage(MODULE_NAME, message, SEVERITY_SUGGESTION);
};
