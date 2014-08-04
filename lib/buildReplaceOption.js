var hintLog = angular.hint = require('angular-hint-log'),
  MODULE_NAME = 'Directives',
  SEVERITY_ERROR = 1;

module.exports = function(directiveName) {
  var message = 'The use of "replace" in directive factories is deprecated,'+
    ' and it was found in "' + directiveName + '".';
  var domElement = '<' + directiveName + '> </' + directiveName + '>';
  hintLog.logMessage(MODULE_NAME, message, SEVERITY_ERROR);
};
